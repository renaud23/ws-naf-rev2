export const NIVEAUX = {
  section: "section",
  division: "division",
  groupe: "groupe",
  classe: "classe",
  sousClasse: "sousClasse",
};

export const STRUCTURE_NIVEAUX = {
  section: { child: NIVEAUX.division, parent: undefined },
  division: { child: NIVEAUX.groupe, parent: NIVEAUX.section },
  groupe: { child: NIVEAUX.classe, parent: NIVEAUX.division },
  classe: { child: NIVEAUX.sousClasse, parent: NIVEAUX.groupe },
  sousClasse: { child: undefined, parent: NIVEAUX.classe },
};
