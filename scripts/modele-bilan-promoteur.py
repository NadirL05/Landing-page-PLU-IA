"""Génère public/modeles/bilan-promoteur-exemple-fictif.xlsx.

Modèle de bilan promoteur simplifié, proposé en téléchargement sur
/bilan-promoteur. Toutes les valeurs d'hypothèse sont FICTIVES : elles
servent à montrer la mécanique du calcul, pas à donner des références de
marché. Formules volontairement simples (sommes, produits, divisions) pour
rester lisibles dans Excel, LibreOffice ou Numbers.

Usage (hors dépendances du site, aucune installation dans le dépôt) :
    python3 -m venv /tmp/venv-xlsx && /tmp/venv-xlsx/bin/pip install openpyxl
    /tmp/venv-xlsx/bin/python scripts/modele-bilan-promoteur.py
"""

from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.workbook.properties import CalcProperties

OUT = Path(__file__).resolve().parent.parent / "public" / "modeles" / "bilan-promoteur-exemple-fictif.xlsx"

INPUT = Font(color="1F4FD1", bold=True)
TOTAL = Font(bold=True)
TITLE = Font(bold=True, size=14)
NOTE = Font(italic=True, color="555555")
HEAD = PatternFill("solid", fgColor="EDEBE6")
EUR = '#,##0" €"'
EUR_M2 = '#,##0" €/m²"'
M2 = '#,##0" m²"'
PCT = "0.0%"


def header(ws, row, text):
    ws.cell(row=row, column=1, value=text).font = TOTAL
    for col in range(1, 5):
        ws.cell(row=row, column=col).fill = HEAD


def line(ws, row, label, value, fmt, note="", kind="formula"):
    ws.cell(row=row, column=1, value=label)
    cell = ws.cell(row=row, column=2, value=value)
    cell.number_format = fmt
    if kind == "input":
        cell.font = INPUT
    elif kind == "total":
        cell.font = TOTAL
        ws.cell(row=row, column=1).font = TOTAL
    ws.cell(row=row, column=3, value="Hypothèse fictive" if kind == "input" else "Calcul")
    ws.cell(row=row, column=4, value=note).font = NOTE


def build():
    wb = Workbook()

    # ---- Lisez-moi -------------------------------------------------------
    info = wb.active
    info.title = "Lisez-moi"
    rows = [
        ("Modèle de bilan promoteur, exemple fictif", TITLE),
        ("Proposé par Fonciable : https://fonciable.fr/bilan-promoteur", None),
        ("", None),
        ("EXEMPLE FICTIF : aucune parcelle réelle, aucune opération réelle, aucun chiffre de client.", TOTAL),
        ("Les valeurs en bleu sont des hypothèses inventées pour illustrer le calcul. Remplacez-les par les vôtres.", None),
        ("Les cellules en noir sont calculées par des formules simples : ne les écrasez pas.", None),
        ("", None),
        ("Onglet « Compte à rebours » : à partir d'une marge cible, calcule la charge foncière admissible", None),
        ("et le prix maximal du terrain hors frais d'acquisition.", None),
        ("Onglet « Bilan direct » : à partir d'un prix de terrain négocié, calcule la marge obtenue.", None),
        ("", None),
        ("Simplifications assumées : montants hors taxes ; frais financiers forfaitaires en % du chiffre", None),
        ("d'affaires (sans échéancier) ; taxe d'aménagement et participations saisies en montant ;", None),
        ("aucune fiscalité propre à votre structure.", None),
        ("", None),
        ("Ce fichier est une aide au raisonnement. Ce n'est ni un certificat d'urbanisme, ni un avis", None),
        ("juridique, fiscal ou financier. La surface de plancher réellement constructible se confirme", None),
        ("auprès du service urbanisme de la commune ; les coûts, par des devis.", None),
    ]
    for i, (text, font) in enumerate(rows, start=1):
        cell = info.cell(row=i, column=1, value=text)
        if font is not None:
            cell.font = font
    info.column_dimensions["A"].width = 110

    # ---- Compte à rebours -----------------------------------------------
    ws = wb.create_sheet("Compte à rebours")
    ws["A1"] = "Bilan promoteur à rebours : charge foncière admissible (exemple fictif)"
    ws["A1"].font = TITLE
    for col, text in zip("ABCD", ["Poste", "Valeur", "Nature", "Commentaire"]):
        ws[f"{col}3"] = text
        ws[f"{col}3"].font = TOTAL

    header(ws, 4, "Programme")
    line(ws, 5, "Surface de plancher (SDP)", 1240, M2, "Issue des règles du PLU : à confirmer en mairie.", "input")
    line(ws, 6, "Rapport surface vendable / SDP", 0.9, PCT, "Part de la SDP réellement vendue.", "input")
    line(ws, 7, "Surface vendable", "=B5*B6", M2)

    header(ws, 9, "Recettes (HT)")
    line(ws, 10, "Prix de vente moyen HT", 4200, EUR_M2, "Par m² vendable.", "input")
    line(ws, 11, "Ventes de logements HT", "=B7*B10", EUR)
    line(ws, 12, "Autres recettes HT (stationnement, locaux…)", 0, EUR, "", "input")
    line(ws, 13, "Chiffre d'affaires HT", "=B11+B12", EUR, "", "total")

    header(ws, 15, "Dépenses hors foncier (HT)")
    line(ws, 16, "Coût de construction HT", 1650, EUR_M2, "Par m² de SDP.", "input")
    line(ws, 17, "Travaux", "=B5*B16", EUR)
    line(ws, 18, "Honoraires techniques (% des travaux)", 0.10, PCT, "Architecte, bureaux d'études, contrôle…", "input")
    line(ws, 19, "Honoraires techniques", "=B17*B18", EUR)
    line(ws, 20, "Assurances (% des travaux)", 0.02, PCT, "", "input")
    line(ws, 21, "Assurances", "=B17*B20", EUR)
    line(ws, 22, "Aléas (% des travaux)", 0.03, PCT, "", "input")
    line(ws, 23, "Aléas", "=B17*B22", EUR)
    line(ws, 24, "Taxe d'aménagement et participations", 80000, EUR, "Montant à calculer pour la commune.", "input")
    line(ws, 25, "Frais de commercialisation (% du CA)", 0.04, PCT, "", "input")
    line(ws, 26, "Frais de commercialisation", "=B13*B25", EUR)
    line(ws, 27, "Frais financiers (% du CA)", 0.025, PCT, "Forfait simplifié, sans échéancier.", "input")
    line(ws, 28, "Frais financiers", "=B13*B27", EUR)
    line(ws, 29, "Total des dépenses hors foncier", "=B17+B19+B21+B23+B24+B26+B28", EUR, "", "total")

    header(ws, 31, "Marge et foncier")
    line(ws, 32, "Marge cible (% du CA HT)", 0.12, PCT, "Objectif de l'opérateur.", "input")
    line(ws, 33, "Marge cible", "=B13*B32", EUR)
    line(ws, 34, "Charge foncière admissible (frais d'acquisition inclus)", "=B13-B33-B29", EUR,
         "CA HT − marge − dépenses hors foncier.", "total")
    line(ws, 35, "Frais d'acquisition (% du prix du terrain)", 0.075, PCT, "Notaire, droits : à confirmer.", "input")
    line(ws, 36, "Prix maximal du terrain hors frais", "=B34/(1+B35)", EUR, "Base de l'offre au propriétaire.", "total")
    line(ws, 37, "Incidence foncière par m² de SDP", "=B34/B5", EUR_M2)
    line(ws, 38, "Part du foncier dans le CA HT", "=B34/B13", PCT)

    # ---- Bilan direct ----------------------------------------------------
    wd = wb.create_sheet("Bilan direct")
    wd["A1"] = "Bilan promoteur direct : marge pour un prix de terrain donné (exemple fictif)"
    wd["A1"].font = TITLE
    for col, text in zip("ABCD", ["Poste", "Valeur", "Nature", "Commentaire"]):
        wd[f"{col}3"] = text
        wd[f"{col}3"].font = TOTAL
    src = "'Compte à rebours'!"
    header(wd, 4, "Repris de l'onglet « Compte à rebours »")
    line(wd, 5, "Chiffre d'affaires HT", f"={src}B13", EUR)
    line(wd, 6, "Total des dépenses hors foncier", f"={src}B29", EUR)
    line(wd, 7, "Frais d'acquisition (% du prix du terrain)", f"={src}B35", PCT)
    header(wd, 9, "Foncier négocié")
    line(wd, 10, "Prix du terrain négocié", 1200000, EUR, "", "input")
    line(wd, 11, "Frais d'acquisition", "=B10*B7", EUR)
    line(wd, 12, "Charge foncière", "=B10+B11", EUR, "", "total")
    header(wd, 14, "Résultat")
    line(wd, 15, "Prix de revient total", "=B12+B6", EUR, "", "total")
    line(wd, 16, "Marge", "=B5-B15", EUR, "", "total")
    line(wd, 17, "Marge en % du CA HT", "=B16/B5", PCT, "", "total")

    for sheet in (ws, wd):
        sheet.column_dimensions["A"].width = 58
        sheet.column_dimensions["B"].width = 18
        sheet.column_dimensions["C"].width = 18
        sheet.column_dimensions["D"].width = 48
        sheet.freeze_panes = "A4"
        for row in sheet.iter_rows(min_row=4, min_col=2, max_col=2):
            for cell in row:
                cell.alignment = Alignment(horizontal="right")

    wb.properties.title = "Modèle de bilan promoteur (exemple fictif)"
    wb.properties.creator = "Fonciable"
    wb.calculation = CalcProperties(fullCalcOnLoad=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    wb.save(OUT)
    print(OUT)


if __name__ == "__main__":
    build()
