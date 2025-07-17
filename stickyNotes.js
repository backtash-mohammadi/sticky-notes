


        // The initial positions
        let newX = 0, newY = 0, startX = 0, startY = 0;

        // Select the element with id "card"
        const card = document.getElementById('card');
        card.setAttribute('contenteditable', 'true');

        // Center card manually in absolute mode
        window.onload = function () {
            const centerX = (window.innerWidth - card.offsetWidth) / 2;
            const centerY = (window.innerHeight - card.offsetHeight) / 2;
            card.style.left = centerX + 'px';
            card.style.top = centerY + 'px';
        };

        // Start drag on mousedown
        card.addEventListener('mousedown', mouseDown);




      // When the mouse button is pressed down
      function mouseDown(e) {
          startX = e.clientX;
          startY = e.clientY;

          document.addEventListener('mousemove', mouseMove);
          document.addEventListener('mouseup', mouseUp);
      }

      function mouseMove(e) {
          newX = startX - e.clientX;
          newY = startY - e.clientY;

          startX = e.clientX;
          startY = e.clientY;

          card.style.top = (card.offsetTop - newY) + 'px';
          card.style.left = (card.offsetLeft - newX) + 'px';
      }

      // When the mouse button is released
      function mouseUp(e) {
          document.removeEventListener('mousemove', mouseMove);
          document.removeEventListener('mouseup', mouseUp);
      }





      let cardCounter = 0;
    // Right-click to create a new card -> contextmenu = right-click
    document.getElementById('container').addEventListener('contextmenu', function (e) {
        e.preventDefault(); // Stop default menu, turns off the normal right click!

        // confirm pop-up
        if (confirm("Create new card here?")) {
            cardCounter++;
            const card = document.createElement('div');
            card.contentEditable = true;
            card.textContent = "New Card: "+ cardCounter;
            card.style.position = 'absolute';
            card.style.left = e.pageX + 'px';
            card.style.top = e.pageY + 'px';
            card.style.width = '200px';
            card.style.height = '200px';
            card.style.backgroundColor = getRandomColor();
            card.style.borderRadius = '5px';
            card.style.cursor = 'move';
            card.style.padding = '10px';
            card.style.fontFamily = 'Arial';

            makeDraggable(card); // Apply dragging
            document.getElementById('container').appendChild(card);
        }
    });




    // Drag functionality for new cards
    function makeDraggable(el) {
        let startX, startY;  // Variables to store initial mouse positions when dragging starts

        // Listen for mouse press on the element to start dragging
        el.addEventListener('mousedown', function (e) {
            startX = e.clientX;  // Record initial horizontal mouse position
            startY = e.clientY;  // Record initial vertical mouse position

            // Function to handle mouse movement while dragging
            function onMouseMove(e) {
                const dx = e.clientX - startX;  // Calculate horizontal distance moved
                const dy = e.clientY - startY;  // Calculate vertical distance moved

                // Update the element's left position by adding horizontal movement
                el.style.left = (el.offsetLeft + dx) + 'px';
                // Update the element's top position by adding vertical movement
                el.style.top = (el.offsetTop + dy) + 'px';

                // Update starting positions for next movement calculation
                startX = e.clientX;
                startY = e.clientY;
            }

            // Function to handle mouse button release and stop dragging
            function onMouseUp() {
                // Remove the mousemove and mouseup event listeners to stop dragging
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            // Add listeners to track mouse movements and release globally
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    }


    // helper
    function getRandomColor(){
        const letters = "0123456789ABCDEF";
        let colorCode="#";
        for (let i = 0; i < 6; i++) {
            // Math floor rounds decimal to int
            colorCode += letters[Math.floor(Math.random() * 16)];
        }
        return colorCode;
    }
