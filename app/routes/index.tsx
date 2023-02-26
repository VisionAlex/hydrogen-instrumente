import {Link, useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {LoaderArgs} from '@shopify/remix-oxygen';

export const meta = () => {
  return {
    title: 'Instrumente Creative',
    description: 'A custom storefront build by Instrumente Creative',
  };
};

export async function loader({context}: LoaderArgs) {
  return await context.storefront.query<any>(COLLECTIONS_QUERY);
}

export default function IndexRoute() {
  const {collections} = useLoaderData<typeof loader>();
  return (
    <section className="w-full gap-4">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
        Collections
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false">
        {collections.nodes.map((collection: any) => {
          return (
            <Link to={`/collections/${collection.handle}`} key={collection.id}>
              <div className="grid gap-4">
                {collection?.image && (
                  <Image
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                    key={collection.id}
                    sizes="(max-width: 32em) 100vw, 33vw"
                    widths={[400, 500, 600, 700, 800, 900]}
                    loaderOptions={{
                      scale: 2,
                      crop: 'center',
                    }}
                  />
                )}
                <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                  {collection.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
query FeaturedCollections {
  collections(first: 3) {
    nodes {
      id
      title
      handle
      image {
          altText
          width
          height
          url
        }
    }
  }
}
`;
