import { graphqlClient } from "./graphClient";

export const fetchSubjects = async () => {
  const response = await graphqlClient.post("", {
    query: `
     query  {
 
  subjects {
  documentId
    subject_id
    title
    description
  }
}
    `,
  });

  return response.data.data.subjects;
};

export const fetchSelectedSubject = async (documentId: string) => {
  const response = await graphqlClient.post("", {
    query: `
     query Subject($documentId: ID!) {
  subject(documentId: $documentId) {
    documentId
    cards {
      title
      documentId
      card_id
    }
  }
}
    `,
    variables: {
      documentId,
    },
  });

  return response.data.data.subject;
};
