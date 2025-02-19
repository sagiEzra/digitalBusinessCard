import { GetStaticProps, GetStaticPaths } from 'next';
import { BusinessCard } from '../components/BusinessCard';
import { db } from '../lib/firebase'; // Firestore instance
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export default function BusinessPage({ businessData }: { businessData: any }) {
  return <BusinessCard data={businessData} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const docRef = doc(db, 'businesses', params?.businessId as string);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return { notFound: true };
  }

  return { props: { businessData: docSnap.data() } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const querySnapshot = await getDocs(collection(db, 'businesses'));
  const paths = querySnapshot.docs.map((doc) => ({
    params: { businessId: doc.id },
  }));

  return { paths, fallback: false }; // Set `true` if you want to allow new businesses dynamically
};
