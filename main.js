document.addEventListener("DOMContentLoaded", function() {
    async function fetchData() {
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

            // Fetch data from Azure Function
            const apiUrl = `https://fernypizzacalculations.azurewebsites.net/api/pizzacalc?pizzaSize=${size}&crust=${crust}&cheese=${cheese}&sauce=${sauce}&toppings=${totalToppings}`;

            try {
                // Fetch data from the constructed URL
                const response = await fetch(apiUrl);

                // Check if the response is successful (status code 200)
                if (response.ok) {
                    const data = await response.json(); // Parse the JSON data from the response
                    const outputDiv = document.getElementById('output');

                    // Display the JSON data on the page
                    outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    fetchData(); // Call the fetchData function
});
