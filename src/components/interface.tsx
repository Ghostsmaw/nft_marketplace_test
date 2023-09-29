export interface Item {
  name: string;
  image_url: string;
  contract: string;
  description: string;
  identifier: string;
  asset_contract: {
    seller_fee_basis_points: number;
  };
  eth_price: number;
  token_id: string;
}

export interface Collection {
  name: string;
  title: string;
}
