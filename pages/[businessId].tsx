import { GetStaticProps, GetStaticPaths } from 'next';
import { BusinessCard } from '../components/BusinessCard';
import { db } from '../lib/firebase'; // Firestore instance
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import path from 'path';
import fs from 'fs';

export default function BusinessPage({ businessData }: { businessData: any }) {
  return <BusinessCard data={businessData} />;
}

/* UNCOMMENT THIS CODE TO USE FIRESTORE */

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const docRef = doc(db, 'businesses', params?.businessId as string);
//   const docSnap = await getDoc(docRef);

//   if (!docSnap.exists()) {
//     return { notFound: true };
//   }

//   return { props: { businessData: docSnap.data() } };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const querySnapshot = await getDocs(collection(db, 'businesses'));
//   const paths = querySnapshot.docs.map((doc) => ({
//     params: { businessId: doc.id },
//   }));

//   return { paths, fallback: false }; // Set `true` if you want to allow new businesses dynamically
// };


/* UNCOMMENT THIS CODE TO USE lOCAL JSONS */


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'data', `${params?.businessId}.json`);
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const businessData = JSON.parse(jsonData);

  return { props: { businessData } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dataDir = path.join(process.cwd(), 'data');
  const filenames = fs.readdirSync(dataDir);
  const paths = filenames.map(name => ({ params: { businessId: name.replace('.json', '') } }));


  return { paths, fallback: false };
}
 
