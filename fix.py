import re

with open('src/components/LiveStudioSimulator.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(
    r"const handleSamplePdfUpload = \(\) => \{.*?\}, 1000\);\s*};",
    """const handleSamplePdfUpload = () => {
    setIsExtractingFile(true);
    setTimeout(() => {
      const demoContent = `# Histoire : La Révolution Française
La Révolution française est une période de bouleversements sociaux et politiques majeurs en France, de 1789 à 1799.
## Causes de la Révolution
- **Crise financière** : Dette colossale de l'État.
- **Inégalités sociales** : La société d'ordres est contestée.
- **Idées des Lumières** : Remise en cause de l'absolutisme.
- **Crise agricole** : Mauvaises récoltes.`;
      setCourseText(demoContent);
      setCustomTitle('Histoire : La Révolution Française');
      setKeyConcepts(['Crise financière', 'Lumières', 'Bastille', '1789', 'Tiers État']);
      setIsCustomMode(true);
      setIsExtractingFile(false);
    }, 1000);
  };""",
    text,
    flags=re.DOTALL
)

with open('src/components/LiveStudioSimulator.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
