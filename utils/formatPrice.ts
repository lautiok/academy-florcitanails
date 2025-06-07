export const formatPrice = (price: string | number): string => {
    if (price === "gratis") {
        return "Gratis";
    }

    const priceNumber = price
        ? parseFloat(String(price).replace(",", "."))
        : 0;

    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
    }).format(priceNumber);
};
