import re

# 1. ArchitectureDiagramView.tsx
with open('src/components/ArchitectureDiagramView.tsx', 'r', encoding='utf-8') as f:
    text = f.read()
text = text.replace("synthèse médicale", "synthèse académique")
with open('src/components/ArchitectureDiagramView.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

# 2. CtoRoadmapView.tsx
with open('src/components/CtoRoadmapView.tsx', 'r', encoding='utf-8') as f:
    text = f.read()
text = text.replace("canvas anatomiques.", "canvas interactifs.")
text = text.replace("En sciences de la santé, le risque de résumés tronqués ou d'erreurs de diagnostic/QCM est inacceptable.", "Dans l'apprentissage, le risque de résumés tronqués ou d'erreurs dans les QCM est inacceptable.")
text = text.replace("Garantie de Précision Académique en Santé", "Garantie de Précision Académique")
text = text.replace("explication anatomique ou physiologique", "explication pédagogique ou théorique")
with open('src/components/CtoRoadmapView.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

# 3. CodeSnippetsView.tsx
with open('src/components/CodeSnippetsView.tsx', 'r', encoding='utf-8') as f:
    text = f.read()
text = text.replace("**App Store Review Guideline 1.2 & 5.1.1 (Health and Health Research)** :", "**App Store Review Guidelines (Éducation & Propriété Intellectuelle)** :")
text = text.replace("> *\"Kiju est un outil pédagogique d'aide à la révision réservé exclusivement aux étudiants en santé. Les contenus générés par IA ne constituent en aucun cas un avis médical, un diagnostic ou une recommandation thérapeutique.\"*", "> *\"Kiju est un outil pédagogique d'aide à la révision réservé aux étudiants. L'application est conçue pour l'apprentissage et l'assimilation de cours denses via IA.\"*")
with open('src/components/CodeSnippetsView.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

# 4. kijuContent.ts
with open('src/data/kijuContent.ts', 'r', encoding='utf-8') as f:
    text = f.read()
text = text.replace("anatomiques 2D/3D et animations", "complexes 2D/3D et animations pédagogiques")
with open('src/data/kijuContent.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("Rewrites applied.")
