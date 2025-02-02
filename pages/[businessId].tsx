import { GetStaticProps, GetStaticPaths } from 'next';
import fs from 'fs';
import path from 'path';
import { BusinessCard } from '../components/BusinessCard';

export default function BusinessPage({ businessData }: { businessData: any }) {
  return <BusinessCard data={businessData} />;
}

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
};