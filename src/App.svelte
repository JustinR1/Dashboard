<script>
  import Balances from "./lib/getBalances.svelte";
  import Stakers from "./lib/getStakers.svelte";
  import Masters from "./lib/MasterCount.svelte";

  
</script>

<main>
  <div>
    <Balances />
  </div>

  <div>
    <Masters />
  </div>

  <div>
    <Stakers />
  </div>
</main>

<style>
  
</style>
