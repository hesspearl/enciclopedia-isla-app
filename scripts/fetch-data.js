import fs from "fs";
import fetch from "node-fetch";
import 'dotenv/config'

async function fetchData() {
   const fetchSubjectsQuery =  `
       query  {
    subjects {
    documentId
      subject_id
      title
      description
       }
     }
      `
  
   const fetchSubjectsRes=await getRes(fetchSubjectsQuery)
   const {data:fetchSubjectsData} = await fetchSubjectsRes.json()
  // Save data locally as JSON
  fs.writeFileSync(
    "./src/data/getSubjects.json",
    JSON.stringify(fetchSubjectsData, null, 2),
  );
  console.log("✅ Strapi data fetched getSubjects and saved!");

  const fetchCardsQuery=`
    query  {
  cards {
  documentId
  card_id
    title
    short_description
    cover_image {
      url
    }
    subject {
      subject_id
    }
  }
}
    `

  const fetchCardsRes = await getRes(fetchCardsQuery)
  const {data:fetchCardsData} = await fetchCardsRes.json();

  // Save data locally as JSON
  fs.writeFileSync(
    "./src/data/getCards.json",
    JSON.stringify(fetchCardsData, null, 2),
  );
  console.log("✅ Strapi data fetched getCards and saved!");
}


const getRes=async(query)=>{
 const serverBaseUrl =`${process.env.VITE_BASE_URL}/graphql`

  const res = await fetch(serverBaseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  return res
}


fetchData();
