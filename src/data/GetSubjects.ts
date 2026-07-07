import { subjects } from "./getSubjects.json";

export const getSelectedSubject = (documentId: string) => {
  const selectedSubject = subjects.find(
    (subject) => subject.documentId === documentId,
  );

  return {
    subject_id: selectedSubject?.subject_id!,
    cards: selectedSubject?.cards ?? [],
  };
};
