 function setup() {
                createCanvas(500, 500);
            }

            function draw() {
                background(260);
                fill("black");

                circle(230, 150, 345);

                //Sticks
                fill("gold"); // Set the fill color to gold
              
                //Sticks
                rect(135, 180, 150, 30); // Rectangle 1
                rect(135, 80, 150, 30); // Rectangle 2
                rect(145, 130, 150, 30); // Rectangle 3
                rect(135, 30, 100, 30); // Rectangle 4

                //sauce
                fill("red");
                circle(350, 150, 50)

                //sauce
                fill("white");
                circle(350, 95, 50)
            }
