<script>
    import { onMount } from "svelte";

    let soulToken = "";
    let kcalToken = "";
    let soulSupply = null;
    let kcalSupply = null;

    function formatNumberWithCommas(number) {
        const [integerPart, decimalPart] = number.toString().split(".");
        return integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
    

    async function getSupply() {
        try {
            const response = await fetch(
                "https://bp1.phantasma.io/api/v1/GetNexus?extended=true"
            );
//             const proxyUrl5 = '/.netlify/functions/proxy5?extended=true';
//             const response = await fetch(proxyUrl5);
            const data = await response.json();
            let soul = data.tokens.find((token) => token.symbol === "SOUL");
            let kcal = data.tokens.find((token) => token.symbol === "KCAL");

            if (soul) {
                soulToken = soul.symbol;
                console.log(soulToken);
            }

            if (kcal) {
                kcalToken = kcal.symbol;
                console.log(kcalToken);
            }

            soulSupply = soul.currentSupply;
            let soulSupplyDecimal = Math.pow(10, 8);
            soulSupply = soulSupply / soulSupplyDecimal;
            soulSupply = formatNumberWithCommas(soulSupply);
            console.log(soulSupply);

            kcalSupply = kcal.currentSupply;
            let kcalSupplyDecimal = Math.pow(10, 10);
            kcalSupply = kcalSupply / kcalSupplyDecimal;
            kcalSupply = formatNumberWithCommas(kcalSupply);
            console.log(soulSupply);
            
        } catch (error) {
            console.error(error);
        }
    }

    onMount(async () => {
        await getSupply();
    });

</script>

<div>
    <div>
        <h1>{soulToken} Supply: {soulSupply}</h1>
    </div>
</div>

<div>
    <div>
        <h1>{kcalToken} Supply: {kcalSupply}</h1>
    </div>
</div>


