(function () {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      'submit',
      (event) => {
        const arrivalDate = form.querySelector('#arrivalDate');
        const departureDate = form.querySelector('#departureDate');
        const rating = form.querySelector('#rating');

        if (arrivalDate && departureDate) {
          const arrivalValue = arrivalDate.value ? new Date(arrivalDate.value) : null;
          const departureValue = departureDate.value ? new Date(departureDate.value) : null;
          const validDates = arrivalValue && departureValue && departureValue >= arrivalValue;

          departureDate.setCustomValidity(validDates ? '' : 'Departure date must be on or after the arrival date.');
        }

        if (rating) {
          const ratingValue = Number(rating.value);
          const validRating = Number.isInteger(ratingValue) && ratingValue >= 1 && ratingValue <= 5;

          rating.setCustomValidity(validRating ? '' : 'Rating must be between 1 and 5.');
        }

        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      },
      false
    );
  });
})();
