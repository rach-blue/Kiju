import os

files = [
    'src/components/LiveStudioSimulator.tsx',
    'src/components/CodeSnippetsView.tsx',
    'src/components/CtoRoadmapView.tsx',
    'src/components/ArchitectureDiagramView.tsx',
    'src/data/kijuContent.ts'
]

replacements = {
    'capsules vidéo 9:16': 'capsules vidéo HD 9:16',
    'Transcription en Vidéo 9:16...': 'Transcription en Vidéo HD 9:16...',
    'Transcrire ce Cours en Capsule Vidéo': 'Transcrire ce Cours en Capsule Vidéo HD',
    'Tout Générer (Vidéo + QCM)': 'Tout Générer (Vidéo HD + QCM)',
    'Erreur Vidéo :': 'Erreur Vidéo HD :',
    'Storyboard Vidéo TikTok/Reels (9:16)': 'Storyboard Vidéo HD TikTok/Reels (9:16)',
    'Génération Composant Vidéo 9:16 MP4': 'Génération Composant Vidéo HD 9:16 MP4',
    'composant vidéo Remotion': 'composant vidéo HD Remotion',
    'Remotion Video MP4': 'Remotion Video HD MP4',
    'génération vidéo IA': 'génération vidéo HD par IA',
    'intégration vidéo native': 'intégration vidéo HD native',
    'stockage vidéo.': 'stockage vidéo HD.',
    'tâches vidéo FFmpeg.': 'tâches vidéo HD FFmpeg.',
    '200 vidéos par mois': '200 vidéos HD par mois',
    '30 vidéos courtes / mois': '30 vidéos courtes HD / mois',
    '50 vidéos supplémentaires': '50 vidéos HD supplémentaires',
    'lecture vidéo 9:16': 'lecture vidéo HD 9:16',
    'Génération Vidéo Automatisée': 'Génération Vidéo HD Automatisée',
    'fichier MP4 final': 'fichier MP4 HD final',
    'vidéos.': 'vidéos HD.',
    'vidéo native': 'vidéo HD native',
    'vidéo fluide': 'vidéo HD fluide',
    'fichiers vidéo': 'fichiers vidéo HD',
    'par vidéo': 'par vidéo HD',
    'générer des vidéos via Remotion': 'générer des vidéos HD via Remotion',
    'aux vidéos clés': 'aux vidéos HD clés',
    '30 vidéos /': '30 vidéos HD /',
    'lecteur vidéo 9:16': 'lecteur vidéo HD 9:16',
    'génération vidéo automatisée': 'génération vidéo HD automatisée',
    'Lecteur audio/vidéo': 'Lecteur audio/vidéo HD'
}

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        for old, new in replacements.items():
            content = content.replace(old, new)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Replacements applied.")
