document.addEventListener("DOMContentLoaded", function() {
    const checkoutButton = document.querySelector("button");

    checkoutButton.addEventListener("click", async function() {
        // Gather selected options
        const size = document.getElementById("size").value;
        const crust = document.getElementById("crust").value;
        const sauce = document.getElementById("sauce").value;
        const cheese = document.getElementById("cheese").value;
        const meats = [];
        document.querySelectorAll("input[name='meat']:checked").forEach(function(item) {
            meats.push(item.value);
        });
        const meatcount = meats.length;
        const veggies = [];
        document.querySelectorAll("input[name='veggie']:checked").forEach(function(item) {
            veggies.push(item.value);
        });
        const veggiecount = veggies.length;
        const totalToppings = veggiecount + meatcount;

        // Display selected options
        alert("Selected options:\n" +
            "Size: " + size + "\n" +
            "Crust: " + crust + "\n" +
            "Sauce: " + sauce + "\n" +
            "Cheese: " + cheese + "\n" +
            "Meats: " + meats.join(", ") + "\n" +
            "Veggies: " + veggies.join(", ") + "\n" +
            "Total Toppings " + totalToppings);

        // Fetch balance from Azure Function
        try {
            const response = await fetch('https://fernypizzacalculations.azurewebsites.net/api/pizzacalc?pizzaSize=' + size + '&crust=' + crust + '&sauce=' + sauce + '&cheese=' + cheese + '&toppings=' + totalToppings);
            const data = await response.text();
            alert("The balance is " + data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert("Error fetching balance: " + error.message);
        }
    });
    document.getElementById('checkout').addEventListener('click', function() {
        setTimeout(function() {
            window.location.href = 'checkout.html';
        }, 6000); 
    });
    
});
