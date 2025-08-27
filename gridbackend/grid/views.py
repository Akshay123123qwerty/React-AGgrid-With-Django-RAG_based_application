from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import gridmodels
from .serializers import gridSerializer, userSerializer
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import connection
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated 
from sentence_transformers import SentenceTransformer
from django.db.models import F
from pgvector.django import L2Distance

class GridView(generics.ListCreateAPIView):
    queryset = gridmodels.objects.all()
    serializer_class = gridSerializer

class GridDelete(generics.RetrieveDestroyAPIView):
    queryset = gridmodels.objects.all()
    serializer_class = gridSerializer


@api_view(['POST'])
def register_user(request):
    serializer = userSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"})
    print(serializer.errors) 
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"error": "Invalid username"}, status=400)

    if not check_password(password, user.password):
        return Response({"error": "Invalid password"}, status=400)

    refresh_token = RefreshToken.for_user(user)
    return Response({
        "refresh": str(refresh_token),
        "access": str(refresh_token.access_token),
    })

from django.db.models import F


_embedder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

@api_view(['GET'])
def search(request):
    query = request.query_params.get("query", "").strip()
    k = int(request.query_params.get("k", 20))

    if not query:
        return Response({"results": [], "groups": []})

    q_vec = _embedder.encode([query])[0].tolist()

    results_qs = (
        gridmodels.objects
        .exclude(embedding=None)
        .annotate(similarity=L2Distance(F('embedding'), q_vec))
        .order_by('similarity')[:k]
    )

    results = [
        {
            "id": r.id,
            "inputValue": r.inputValue,
            "derivedOption": r.derivedOption,
            "category": r.category,
        }
        for r in results_qs
    ]

    groups_dict = {}
    for r in results:
        cat = r["category"]
        groups_dict.setdefault(cat, []).append(r["inputValue"])

    grouped = [
        {"category": cat, "count": len(vals), "inputValues": list(dict.fromkeys(vals))}
        for cat, vals in groups_dict.items()
    ]

    return Response({"results": results, "groups": grouped})



