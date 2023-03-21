<script lang="ts">
    import { onMount } from "svelte";
//     import { phantasmaJS } from "phantasma-ts";

    let soulMaster = "";

    async function getSoulMaster() {
//         const proxyUrl2 = '/.netlify/functions/proxy2';
//         let response = await fetch(proxyUrl2);
//         let data = await response.json();
//         let soulMaster = data.members.length;
//         console.log(soulMaster);
//         return soulMaster;
        const response = await fetch('https://bp1.phantasma.io/api/v1/GetOrganization?ID=masters');
        let data = await response.json();
        let soulMaster = data.members.length;
        console.log(soulMaster);
        return soulMaster;
       
    }
//         USING PHANTASMA-TS LIBRARY
//         let sb = new phantasmaJS.ScriptBuilder();
//         sb.CallContract("stake", "GetMasterCount", []);
//         let script = sb.EndScript();
//         let targetChain = "main";

//         let RPC = new phantasmaJS.PhantasmaAPI(
//             "https://pharpc1.phantasma.io:7077/rpc",
//             "https://peers.phantasma.io/mainnet-getpeers.json?_=1678544254371",
//             "mainnet"
//         );
//         let response = await RPC.invokeRawScript(targetChain, script);

//         const d = new phantasmaJS.Decoder(response.result);
//         const soulMaster = d.readVmObject();

//         return soulMaster;
//     }

    onMount(async () => {
        soulMaster = await getSoulMaster();
    });

    async function refreshData() {
        try {
            await soulMaster;
            console.log(soulMaster);
        } catch (error) {
            console.error(error);
        }
    }
</script>

<div id="bg2">
    <div id="div2">
        <h1>Soul Masters: {soulMaster}</h1>
<!--         <button on:click={refreshData}>Update</button> -->
    </div>
</div>

<style>
/*     button:focus {
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
    } */
</style>
