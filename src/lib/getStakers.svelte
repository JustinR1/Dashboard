<script>
    import { onMount } from "svelte";

        function formatNumberWithCommas(number) {
        const [integerPart, decimalPart] = number.toString().split(".");
        return integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
    
    let stakerMembers = 0;
    const getStakerMembers = async () => {
        try {
            const response = await fetch(
                "https://pharpc1.phantasma.io:7077/api/v1/GetOrganizationByName?name=stakers"
            );
            let stakers = await response.json();
            stakerMembers = stakers.members.length;
            stakerMembers = formatNumberWithCommas(stakerMembers);

        } catch (error) {
            console.error(error);
        }
    };

    getStakerMembers();

    $: stakerCount = stakerMembers.toString();

    async function refreshData() {
        try {
            await getStakerMembers();
            console.log(stakerMembers);
        } catch (error) {
            console.error(error);
        }
    }

    onMount(refreshData);

    let clicked = false;

    function handleClick() {
        clicked = true;
        setTimeout(() => {
            clicked = true; 
        }, 500);
    }

    
</script>

<div id="bg">
    <div id="div">
        <h1>Stakers: {stakerCount}</h1>
        <button on:click={handleClick} on:click={refreshData} class:clicked={clicked}>Update</button>
    </div>
</div>

<style>
    button:focus {
        outline: none;
    }

    button {
        padding: 8px 16px;
        font-size: 16px;
        color: #fff;
        background-color: #2962ff;
        border: none;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        transition: background-color 0.25s ease-out;
    }
    
    button:hover {
        background-color: #3353ad;

    }
    div {
        padding: 7px;
    }
</style>
