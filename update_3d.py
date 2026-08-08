import os

replacements = {
    'src/components/LiveStudioSimulator.tsx': [
        ('capsules vidéo HD 9:16', 'animations 3D HD 9:16'),
        ('Transcription en Vidéo HD 9:16...', 'Génération Animation 3D HD 9:16...'),
        ('Transcrire ce Cours en Capsule Vidéo HD', 'Créer une Animation 3D HD du Cours'),
        ('Tout Générer (Vidéo HD + QCM)', 'Tout Générer (Animation 3D HD + QCM)'),
        ('Erreur Vidéo HD :', 'Erreur Animation 3D :'),
        ('Storyboard Vidéo HD TikTok/Reels (9:16)', 'Storyboard Animation 3D HD TikTok/Reels (9:16)'),
        ('Moteur de Génération Vidéo :', 'Moteur de Génération Animation 3D :')
    ],
    'src/components/CodeSnippetsView.tsx': [
        ('Génération Composant Vidéo HD 9:16 MP4', 'Génération Composant Animation 3D HD 9:16 MP4'),
        ('composant vidéo HD Remotion', "composant d'animation 3D Remotion"),
        ('Remotion Video HD MP4', 'Remotion Animation 3D MP4')
    ],
    'src/components/CtoRoadmapView.tsx': [
        ('génération vidéo HD par IA', "génération d'animations 3D HD par IA"),
        ('intégration vidéo HD native', 'intégration 3D native'),
        ('stockage vidéo HD', 'stockage vidéo 3D HD'),
        ('tâches vidéo HD FFmpeg', 'tâches de rendu 3D FFmpeg'),
        ('200 vidéos HD par mois', '200 animations 3D par mois'),
        ('30 vidéos courtes HD / mois', '30 animations 3D courtes HD / mois'),
        ('50 vidéos HD supplémentaires', '50 animations 3D supplémentaires')
    ],
    'src/components/ArchitectureDiagramView.tsx': [
        ('lecture vidéo HD 9:16', "lecture d'animations 3D HD 9:16"),
        ('Remotion Video Rendering', 'Remotion 3D Animation Rendering'),
        ('Génération Vidéo HD Automatisée', "Génération d'Animation 3D Automatisée"),
        ('fichier MP4 HD final', "fichier MP4 d'animation 3D final"),
        ('cours et vidéos HD', 'cours et animations 3D HD')
    ],
    'src/data/kijuContent.ts': [
        ('animations pédagogiques', 'animations 3D pédagogiques'),
        ('vidéo HD native', 'vidéo 3D native'),
        ('vidéo HD fluide', 'animation 3D fluide'),
        ('fichiers vidéo HD', "fichiers d'animation 3D"),
        ('par vidéo HD', 'par animation 3D'),
        ('générer des vidéos HD via Remotion', 'générer des animations 3D via Remotion'),
        ('vidéos HD clés', 'animations 3D clés'),
        ('30 vidéos HD /', '30 animations 3D /'),
        ('lecteur vidéo HD 9:16', "lecteur d'animation 3D 9:16"),
        ('génération vidéo HD automatisée', "génération d'animation 3D automatisée"),
        ('Lecteur audio/vidéo HD', 'Lecteur audio/animation 3D')
    ],
    'src/components/UnitEconomicsCalculator.tsx': [
        ('% de Cours Générant une Vidéo', '% de Cours Générant une Animation 3D'),
        ('Moteur de Génération Vidéo', 'Moteur de Génération 3D'),
        ('/ vidéo', '/ animation 3D'),
        ('Coût Génération Vidéo', 'Coût Génération 3D'),
        ('rendu vidéo', 'rendu 3D')
    ]
}

for file_path, changes in replacements.items():
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        for old, new in changes:
            content = content.replace(old, new)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

print("3D Replacements applied.")
