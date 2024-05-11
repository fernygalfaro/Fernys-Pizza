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

        // Call Azure Function API
        try {
            const response = await fetch(`https://fernypizzacalculations.azurewebsites.net/api/pizzacalc?pizzaSize=${size}&crust=${crust}&cheese=${cheese}&sauce=${sauce}&toppings=${totalToppings}`);
            const data = await response.json();
            alert("Result from Azure Function:\n" + JSON.stringify(data));
        } catch (error) {
            console.error('Error calling Azure Function:', error);
            alert('Error calling Azure Function. Please try again later.');
        }
    });

});
