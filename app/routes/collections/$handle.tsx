import {useLoaderData} from '@remix-run/react';
import {json, LoaderArgs} from '@shopify/remix-oxygen';

export async function loader({params, context}: LoaderArgs) {
  const {handle} = params;
  const {collection} = await context.storefront.query<any>(COLLECTION_QUERY, {
    variables: {
      handle,
    },
  });

  if (!collection) {
    throw new Response(null, {status: 404});
  }

  return json({
    collection,
  });
}

const seo = ({data}: any) => ({
  title: data?.collection?.title,
  description: data?.collection?.description,
});

export const handle = {
  seo,
};

export default function Collection() {
  const {collection} = useLoaderData();
  return (
    <>
      <header className="grid w-full gap-8 py-8 justify-items-start">
        <h1 className="text-4xl whitespace-pre-wrap font-bold inline-block">
          {collection.title}
        </h1>

        {collection.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inherit text-copy inline-block">
                {collection.description}
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
const COLLECTION_QUERY = `#graphql
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      title
      description
      handle
    }
  }
`;
