serviceCost = 0;

const validateName = (input, label) => {
      if ($(input).val().length < 3) {
            $(label).html(
                  '<i class="fa-solid fa-circle-exclamation" class="pe-2"></i> Your name should be 3 characters atleast.'
            );
            $(label).css('opacity', '1');
            return false;
      } else {
            $(label).html('');
            $(label).css('opacity', '0');
            return true;
      }
};

const validateEmail = (input, label) => {
      if ($(input).val().length <= 0) {
            $(label).html(
                  '<i class="fa-solid fa-circle-exclamation" class="pe-2"></i> An email address is required.'
            );
            $(label).css('opacity', '1');
            return false;
      } else if (
            !/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/.test($(input).val())
      ) {
            $(label).html(
                  '<i class="fa-solid fa-circle-exclamation" class="pe-2"></i> Invalid email address. Please re-check your email.'
            );
            $(label).css('opacity', '1');
            return false;
      } else {
            $(label).html('');
            $(label).css('opacity', '0');
            return true;
      }
};
const validateContact = (input, label) => {
      if ($(input).val().length <= 0) {
            $(label).html(
                  '<i class="fa-solid fa-circle-exclamation" class="pe-2"></i> A contact number is required.'
            );
            $(label).css('opacity', '1');
            return false;
      } else if (!/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test($(input).val())) {
            $(label).html(
                  '<i class="fa-solid fa-circle-exclamation" class="pe-2"></i> Contact number should be 10 digits.'
            );
            $(label).css('opacity', '1');
            return false;
      } else {
            $(label).html('');
            $(label).css('opacity', '0');
            return true;
      }
};

$(document).ready(() => {
      $('#bookingForm').submit(async (e) => {
            e.preventDefault();
            const nm = validateName('#fullName', '#fullNamevalidation');
            const em = validateEmail('#eMail', '#emailvalidation');
            const ct = validateContact('#contact', '#contactvalidation');

            if (nm && em && ct) {
                  const amtLabel = document.getElementById('amount');
                  const confBtn = document.getElementById('confirm');
                  amtLabel.innerHTML = '';
                  confBtn.innerHTML = '';

                  const costSpan1 = document.createElement('span');
                  costSpan1.id = 'amountlabel';
                  costSpan1.className = 'text-white display-6';
                  costSpan1.innerHTML = 'Do you want to confirm this booking?';
                  amtLabel.appendChild(costSpan1);

                  const cancelBT = document.createElement('button');
                  cancelBT.type = 'button';
                  cancelBT.id = 'cancelButton';
                  cancelBT.className =
                        'btn btn-lg btn-outline-secondary d-flex align-items-center my-2 m-md-0 col-md-auto ms-md-auto';
                  cancelBT.innerHTML = 'Cancel <i class="fa-solid fa-xmark ps-2"></i>';
                  cancelBT.onclick = () => {
                        location.reload();
                  };
                  confBtn.appendChild(cancelBT);

                  const confirmBT = document.createElement('button');
                  confirmBT.type = 'button';
                  confirmBT.id = 'checkoutButton';
                  confirmBT.className =
                        'btn btn-lg btn-outline-info d-flex align-items-center my-2 m-md-0 col-md-auto ms-md-3';
                  confirmBT.innerHTML = 'Confirm <i class="fa-solid fa-clipboard-check ps-2"></i>';
                  confirmBT.onclick = () => {
                        confirmBT.innerHTML = '<i class="fa-solid fa-gear fa-spin"></i>';
                        const bodies = Array(
                              Number($('#carsPossible').find(':selected').val().trim())
                        )
                              .fill()
                              .map((val, ind) => ind + 1)
                              .map((num) =>
                                    $('#body' + num)
                                          .find(':selected')
                                          .val()
                              );
                        const servs = Array(
                              Number($('#carsPossible').find(':selected').val().trim())
                        )
                              .fill()
                              .map((val, ind) => ind + 1)
                              .map((num) =>
                                    $('#service' + num)
                                          .find(':selected')
                                          .val()
                              );
                        const carNames = Array(
                              Number($('#carsPossible').find(':selected').val().trim())
                        )
                              .fill()
                              .map((val, ind) => ind + 1)
                              .map((num) => $('#carNameInput' + num).val());
                        const carModels = Array(
                              Number($('#carsPossible').find(':selected').val().trim())
                        )
                              .fill()
                              .map((val, ind) => ind + 1)
                              .map((num) => $('#carModelInput' + num).val());
                        const carYears = Array(
                              Number($('#carsPossible').find(':selected').val().trim())
                        )
                              .fill()
                              .map((val, ind) => ind + 1)
                              .map((num) => $('#carYearInput' + num).val());
                        $.ajax({
                              url: 'http://localhost:1111/email',
                              method: 'POST',
                              data: {
                                    phone: $('#contact').val(),
                                    uname: $('#fullName').val(),
                                    reciever: $('#eMail').val(),
                                    total: Number(
                                          $('#carsPossible').find(':selected').val().trim()
                                    ),
                                    sNo: Number(
                                          $('#slotsAvailable').find(':selected').val().trim()
                                    ),
                                    sTime: $('#slotsAvailable').find(':selected').text().trim(),
                                    outlet: $('#waterOutlet').is(':checked'),
                                    bodystyle: JSON.stringify(bodies),
                                    service: JSON.stringify(servs),
                                    carname: JSON.stringify(carNames),
                                    carmodel: JSON.stringify(carModels),
                                    caryear: JSON.stringify(carYears),
                              },
                              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                              success: function (response) {
                                    if (response.status === 200)
                                          alert(
                                                'Your order is being being processed for confirmation. Please check your mail inbox.'
                                          );
                                    else
                                          alert(
                                                'Our apologies. It seems we encountered some issue while placing your order.'
                                          );
                                    location.reload();
                              },
                              error: function (error) {
                                    console.log(error);
                              },
                        });
                  };
                  confBtn.appendChild(confirmBT);
            }
      });
});
