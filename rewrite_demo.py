import re

with open('src/components/LiveStudioSimulator.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the specific AVC block
text = re.sub(
    r"const demoContent = `# Neurologie :.*?setKeyConcepts\(\['Score FAST'.*?\]\);",
    """const demoContent = `# Histoire : La Révolution Française
La Révolution française est une période de bouleversements sociaux et politiques majeurs en France, de 1789 à 1799.
## Causes de la Révolution
- **Crise financière** : Dette colossale de l'État.
- **Inégalités sociales** : La société d'ordres est contestée.
- **Idées des Lumières** : Remise en cause de l'absolutisme.
- **Crise agricole** : Mauvaises récoltes.`;
      setCustomTitle('Histoire : La Révolution Française');
      setKeyConcepts(['Crise financière', 'Lumières', 'Bastille', '1789', 'Tiers État']);""",
    text,
    flags=re.DOTALL
)

text = text.replace("Fiche PDF d'exemple (AVC Ischémique)", "Fiche PDF d'exemple (Révolution Française)")

with open('src/components/LiveStudioSimulator.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

