<script>
    import { onMount } from "svelte";

    let input = "";
    let balances = [];
    let stakeAmount = 0;
    let accountName = "";
    let stakeError = "";
    let displayContent = false;

    function clearData() {
        input = "";
        balances = [];
        stakeAmount = 0;
        accountName = "";
        stakeError = "";
        displayContent = false;
    }
    

    async function lookUpAddress(input) {
        if (input.startsWith("P")) {
            return input;
        }
        try {
            const response = await fetch(
                `https://bp1.phantasma.io/api/v1/LookUpName?name=${input.toLowerCase()}`);
//             const proxyUrl3 = `/.netlify/functions/proxy3?name=${input.toLowerCase()}`;
//             let response = await fetch(proxyUrl3);
            let data = await response.json();
            console.log("API response:", data); // Add this line to log the response


            
             if (data && data.startsWith("P")) {
                return data;
            }
        } catch (error) {
            console.error(error);
        }
        // If the input is not a valid name, assume it's an address and return it directly
        return input;
    }

    async function getBalances(event) {
        if (event.key !== "Enter") {
            return;
        }

        displayContent = true;

        try {
            const resolvedAddress = await lookUpAddress(input);
            if (!resolvedAddress) {
                console.log(
                    "Invalid input, neither a valid name nor a valid address."
                );
                balances = [];
                accountName = "Not found";
                return;
            }
            const response = await fetch(
                `https://bp1.phantasma.io/api/v1/GetAccount?account=${resolvedAddress}`
            );
//             const proxyUrl4 = `/.netlify/functions/proxy4?name=${resolvedAddress}`;
//             const response = await fetch(proxyUrl4);


            // Getting balances
            const data = await response.json();
            if (data.error) {
                console.log("Error", data.error);
                balances = [];
                accountName = "Not found";
                return;

            }
            balances = data.balances || [];

            //Getting stake data
            stakeAmount = data.stake;
            const stakeDecimal = Math.pow(10, 8);
            stakeAmount = stakeAmount / stakeDecimal;

            // Getting name data
            accountName = data.name;
            if (accountName) {
                let stringName = accountName.toLocaleString();
                console.log(stringName);
            } else {
                console.log("Account not Found.");
                accountName = "Not found";
            }
            // Convert balances to actual values using decimal value
            balances.forEach((balance) => {
                const decimalValue = balance.decimals;
                const multiplier = Math.pow(10, decimalValue);
                balance.amount = balance.amount / multiplier;
            });
        } catch (error) {
            console.error(error);
            accountName = "Not found";
        }
    }
</script>
<div>
    {#if displayContent}
    <ul>
            <li><h3>Account name:  {accountName}</h3></li>
            <li>SOUL Stake: {stakeAmount.toLocaleString()}</li>
        <!--Iterating through balances array to find the symbols and amounts -->
        {#each balances as balance}
            <li>{balance.symbol}: {balance.amount.toLocaleString()}</li>
        {:else}
            <li>No Balances Found.</li>
        {/each}
    </ul>
    {/if}
    <div class="input-container">

        <input
            class="search-input"
            style="width: 500px;"
            on:keydown={getBalances}
            type="text"
            bind:value={input}
            placeholder="Get Balances"
        />
        <!-- <button class="search-button" on:click={() => getBalances({key: 'Enter'})}>Search</button> -->

        <button on:click={clearData}>Clear</button>
    </div>
</div>

<style>
    .input-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
    }

    ul {
        list-style: none;
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
        margin-top: 10px;
    }
    
    button:hover {
        background-color: #3353ad;

    }
    /* Add styles for the search input */
    .search-input {
        padding: 8px 16px;
        font-size: 16px;
        border: 2px solid #2962ff;
        border-radius: 5px 0 0 5px;
        outline: none;
        text-align: center;
    }


</style>
