import re
import os

# 1. Update kijuContent.ts
with open('src/data/kijuContent.ts', 'r', encoding='utf-8') as f:
    kiju = f.read()

# Replace medical courses with general courses
kiju = re.sub(
    r"export const SAMPLE_COURSES: SampleCourse\[\] = \[.*?\nexport interface StackComparison",
    """export const SAMPLE_COURSES: SampleCourse[] = [
  {
    id: 'histoire-revolution',
    title: 'Histoire : La Révolution Française',
    category: 'Histoire',
    difficulty: 'Licence 1',
    content: `La Révolution française est une période de bouleversements sociaux et politiques majeurs en France, de 1789 à 1799. Elle a marqué la fin de l'Ancien Régime et le remplacement de la monarchie absolue par une monarchie constitutionnelle, puis par la Première République.\\nPrincipales causes :\\n1. Crise financière : Dette colossale de l'État et impôts inéquitables (le Tiers État paie la majorité, noblesse et clergé sont exemptés).\\n2. Inégalités sociales : La société d'ordres est de plus en plus contestée.\\n3. Influence des Lumières : Les philosophes comme Rousseau et Montesquieu promeuvent la liberté et la séparation des pouvoirs.\\nÉvénements clés :\\n- 5 mai 1789 : Ouverture des États généraux.\\n- 14 juillet 1789 : Prise de la Bastille.\\n- 26 août 1789 : Déclaration des droits de l'homme et du citoyen.`
  },
  {
    id: 'eco-macro',
    title: 'Introduction à la Macroéconomie',
    category: 'Économie',
    difficulty: 'Licence 2',
    content: `La macroéconomie étudie le fonctionnement de l'économie dans son ensemble. Les principaux indicateurs macroéconomiques sont :\\n1. Le Produit Intérieur Brut (PIB) : Valeur totale des biens et services produits sur un territoire donné au cours d'une année.\\n2. Le taux de chômage : Pourcentage d'actifs sans emploi et à la recherche d'un travail.\\n3. L'inflation : Augmentation générale et durable des prix, mesurée par l'Indice des Prix à la Consommation (IPC).\\nLes politiques économiques :\\n- Politique monétaire : Gérée par la Banque Centrale (ex: BCE) pour contrôler la masse monétaire et les taux d'intérêts (objectif: stabilité des prix).\\n- Politique budgétaire : Gérée par le gouvernement via les dépenses publiques et la fiscalité pour relancer la croissance (politique expansionniste) ou réduire la dette (politique de rigueur).`
  }
];

export interface StackComparison""",
    kiju,
    flags=re.DOTALL
)

# Generalize roadmap content
kiju = kiju.replace('sur les cours de médecine', 'sur les documents et cours académiques')
kiju = kiju.replace('précision médicale', 'précision académique')
kiju = kiju.replace('Génération de QCM & RAG Médical', 'Génération de QCM & RAG Pédagogique')
kiju = kiju.replace('jargon médical français (termes latins/grecs)', 'termes techniques et concepts académiques complexes')
kiju = kiju.replace('Prononciation médicale naturelle', 'Prononciation académique naturelle')
kiju = kiju.replace('étudiants en santé', 'étudiants (Lycée, Prépa, Université)')
kiju = kiju.replace('200 étudiants PASS/LAS', '500 étudiants (Bêta Testeurs)')
kiju = kiju.replace('Conformité médicale App Store (Clause 1.2 & Avertissement obligatoire non-diagnostic)', 'Conformité RGPD et Conditions App Store (Guidelines EdTech)')
kiju = kiju.replace('révision nocturne des étudiants en santé', 'sessions de révision intensives des étudiants')

with open('src/data/kijuContent.ts', 'w', encoding='utf-8') as f:
    f.write(kiju)


# 2. Update CodeSnippetsView.tsx
with open('src/components/CodeSnippetsView.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace('QCM Médical', 'QCM Académique')
code = code.replace('enseignant chercheur en médecine', 'enseignant expert en pédagogie')
code = code.replace('d\'évaluation médicale', 'd\'évaluation pédagogique')
code = code.replace('explication médicale justificative', 'explication détaillée et justifiée')
code = code.replace('MedicalSlideComposition', 'EduSlideComposition')
code = code.replace('Kiju Medical', 'Kiju EdTech')
code = code.replace('App Store Medical Guidelines & Mandatory Disclaimer', 'App Store EdTech & Subscription Compliance')
code = code.replace('Conformité médicale App Store', 'Conformité EdTech App Store')
code = code.replace('APP_STORE_COMPLIANCE.md', 'APP_STORE_EDTECH.md')
code = code.replace('Conformité App Store Santé', 'Conformité Store EdTech')
code = code.replace(
    'Conformité App Store Connect & Google Play pour Kiju## 1. Avertissement Légal Obligatoire (Disclaimer)Pour respecter la directive Apple **App Store Review Guideline 1.2 & 5.1.1 (Health and Health Research)** :L\'application doit intégrer un pop-up d\'acceptation au premier lancement et un bandeau permanent dans les paramètres :> *"Kiju est un outil pédagogique d\'aide à la révision réservé exclusivement aux étudiants en santé. Les contenus générés par IA ne constituent en aucun cas un avis médical, un diagnostic ou une recommandation thérapeutique."*',
    '''Conformité App Store Connect & Google Play pour Kiju\\n\\n## 1. Propriété Intellectuelle (Règle 4.1)\\nLes cours importés par les étudiants restent leur propriété ou sont soumis aux droits de leurs établissements respectifs. Kiju n\\'agit que comme outil de traitement local et de synthétisation par IA sans diffusion publique.\\n\\n## 2. Abonnements (Règle 3.1.2)'''
)
code = code.replace('checklist App Store.', 'checklist App Store pour application éducative.')

with open('src/components/CodeSnippetsView.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

# 3. Update App.tsx
with open('src/App.tsx', 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace('Révision Médicale IA', 'Outil de Révision IA')
app = app.replace('Conçu pour la révision médicale', 'Conçu pour la réussite étudiante')

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(app)

# 4. Update CtoRoadmapView.tsx
try:
    with open('src/components/CtoRoadmapView.tsx', 'r', encoding='utf-8') as f:
        cto = f.read()
    cto = cto.replace('Révision Médicale', 'Révision Etudiante')
    cto = cto.replace('médicale', 'académique')
    with open('src/components/CtoRoadmapView.tsx', 'w', encoding='utf-8') as f:
        f.write(cto)
except FileNotFoundError:
    pass

print("Update completed successfully.")
