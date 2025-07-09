import { GetStaticProps, GetStaticPaths } from 'next';
import { BusinessCard } from '../components/BusinessCard';
import { db } from '../lib/firebase'; // Firestore instance
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import path from 'path';
import fs from 'fs';

export default function BusinessPage({ businessData }: { businessData: any }) {
  return <BusinessCard data={businessData} />;
}

/* UNCOMMENT THIS CODE TO USE FIRESTORE */

type Props = {
  businessData: any;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const routeName = params?.routeName as string;

  const q = query(collection(db, 'businesses'), where('routeName', '==', routeName));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return { notFound: true };
  }

  const businessDataRaw = querySnapshot.docs[0].data();
  const businessData = {
    ...businessDataRaw,
    createdAt: businessDataRaw.createdAt?.toDate().toISOString() ?? null,
    updatedAt: businessDataRaw.updatedAt?.toDate().toISOString() ?? null
  };

  return {
    props: { businessData },
    revalidate: 300, // Revalidate every 5 minutes
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const querySnapshot = await getDocs(collection(db, 'businesses'));

  const paths = querySnapshot.docs  
    .map((doc) => doc.data().routeName)
    .filter(Boolean)
    .map((routeName) => ({
      params: { routeName: routeName },
    }));

  return {
    paths,
    fallback: 'blocking', // Generate new pages on demand
  };
};




/* UNCOMMENT THIS CODE TO USE lOCAL JSONS */


// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const filePath = path.join(process.cwd(), 'data', `${params?.businessId}.json`);
//   const jsonData = fs.readFileSync(filePath, 'utf8');
//   const businessData = JSON.parse(jsonData);

//   return { props: { businessData } };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const dataDir = path.join(process.cwd(), 'data');
//   const filenames = fs.readdirSync(dataDir);
//   const paths = filenames.map(name => ({ params: { businessId: name.replace('.json', '') } }));


//   return { paths, fallback: false };
// }
 
