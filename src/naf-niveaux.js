export const NIVEAUX = {
  sections: "sections",
  divisions: "divisions",
  groupes: "groupes",
  classes: "classes",
  sousClasses: "sousClasses",
};

export const STRUCTURE_NIVEAUX = {
  sections: { child: NIVEAUX.divisions, parent: undefined },
  divisions: { child: NIVEAUX.groupes, parent: NIVEAUX.sections },
  groupes: { child: NIVEAUX.classes, parent: NIVEAUX.divisions },
  classes: { child: NIVEAUX.sousClasses, parent: NIVEAUX.groupes },
  sousClasses: { child: undefined, parent: NIVEAUX.classes },
};

export default NIVEAUX;
