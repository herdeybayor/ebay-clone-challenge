import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { Header } from "../../components";
import useListItem from "../../utils/hooks/useListItem";
import useMint from "../../utils/hooks/useMint";

type Props = {};

function ListingPage({}: Props) {
    const router = useRouter();
    const { listingId } = router.query as { listingId: string };

    const { address, openConnectModal, openAddInventory } = useMint();
    const { openListItem } = useListItem();
    return (
        <div>
            <Head>
                <title>Ebay Marketplace {listingId}</title>
            </Head>

            <Header />
        </div>
    );
}

export default ListingPage;
