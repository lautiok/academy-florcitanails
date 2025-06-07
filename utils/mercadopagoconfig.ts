import { MercadoPagoConfig} from "mercadopago";

if (!process.env.MP_ACCESS_TOKEN) {
  throw new Error("MERCADOPAGO_PUBLIC_KEY no encontrado");
}

export const mercadopago: MercadoPagoConfig = {
  accessToken: process.env.MP_ACCESS_TOKEN,
};

