let maxCars = 0;
let bodies = [];
let serves = [];
const dropdown = document.getElementById('slotsAvailable');
const cardropdown = document.getElementById('carsPossible');
const dynamic = document.getElementById('costing');

const createSlots = (pos, len) => {
      if (pos !== 0) {
            maxCars = len;
            for (let i = 1; i <= len; i += 1) {
                  const option = document.createElement('option');
                  option.value = i;
                  option.innerHTML = i;
                  option.disabled = true;
                  cardropdown.appendChild(option);
            }
      } else {
            const option = document.createElement('option');
            option.value = 0;
            option.innerHTML = `Sorry! We called it a day. Please come again tomorrow.`;
            cardropdown.appendChild(option);
            option.selected = true;
            cardropdown.disabled = true;
            document.getElementById('waterOutlet').disabled = true;
            document.getElementById('submitButton').className = 'd-none';
      }
};

const getPossibleSlots = () => {
      const selected = Number($('#carsPossible').find(':selected').val().trim());
      if (selected) {
            $.ajax({
                  url: 'http://localhost:1111/slots/',
                  method: 'POST',
                  data: { no: selected },
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  success: function (available) {
                        dropdown.innerHTML = '';
                        available.data.forEach((slot) => {
                              const option = document.createElement('option');
                              option.value = slot.slotNo;
                              option.innerHTML = slot.startTime;
                              dropdown.appendChild(option);
                        });
                  },
                  error: function (error) {
                        console.log(error);
                  },
            });
      } else {
            const option = document.createElement('option');
            option.value = 0;
            option.innerHTML = `Sorry! We called it a day. Please come again tomorrow.`;
            dropdown.appendChild(option);
            dropdown.className = 'form-control bg-dark border-0 text-white dropdown';
            option.selected = true;
            dropdown.disabled = true;
      }
};

const createFields = () => {
      const selectedCars = Number($('#carsPossible').find(':selected').val().trim());
      dynamic.innerHTML = '';
      for (let i = 0; i < selectedCars; i += 1) {
            const box = document.createElement('div');
            box.id = 'box' + (i + 1);
            box.className = 'row g-0 carBox';
            const carName = document.createElement('div');
            carName.id = 'nameDiv' + (i + 1);
            carName.className = 'col-12';
            const carModel = document.createElement('div');
            carModel.id = 'modelDiv' + (i + 1);
            carModel.className = 'col-12';
            const carYear = document.createElement('div');
            carYear.id = 'yearDiv' + (i + 1);
            carYear.className = 'col-12';
            const carType = document.createElement('div');
            carType.id = 'typeDiv' + (i + 1);
            carType.className = 'col-12 col-lg-6 d-flex align-items-center py-2 px-4 flex-wrap';
            const carService = document.createElement('div');
            carService.id = 'serviceDiv' + (i + 1);
            carService.className = 'col-12 col-lg-6 d-flex align-items-center py-2 px-4 flex-wrap';
            const boxNumber = document.createElement('label');
            boxNumber.for = 'box' + (i + 1);
            boxNumber.innerHTML = 'for car ' + (i + 1);
            boxNumber.className = 'boxnumber';

            box.appendChild(carName);
            box.appendChild(carModel);
            box.appendChild(carYear);
            box.appendChild(carType);
            box.appendChild(carService);
            box.appendChild(boxNumber);
            dynamic.appendChild(box);

            createCarInput(
                  document.getElementById('nameDiv' + (i + 1)),
                  'carNameInput' + (i + 1),
                  'Car Name',
                  'text'
            );
            createCarInput(
                  document.getElementById('modelDiv' + (i + 1)),
                  'carModelInput' + (i + 1),
                  'Car Model',
                  'text'
            );
            createCarInput(
                  document.getElementById('yearDiv' + (i + 1)),
                  'carYearInput' + (i + 1),
                  'Car Model Year',
                  'number'
            );
            createTypeSelectors(
                  document.getElementById('typeDiv' + (i + 1)),
                  'body' + (i + 1),
                  'Car type:'
            );
            createServiceSelectors(
                  document.getElementById('serviceDiv' + (i + 1)),
                  'service' + (i + 1),
                  'Car service:'
            );
      }
};

const createCarInput = (containerDiv, inputName, label, inpType) => {
      const div = document.createElement('div');
      div.className = 'form-floating mb-1';
      const inp = document.createElement('input');
      inp.type = inpType;
      inp.required = true;
      inp.className = 'form-control book-input';
      inp.id = inputName;
      inp.placeholder = label;
      if (inpType === 'number') inp.max = Number(new Date().getFullYear());
      const lab = document.createElement('label');
      lab.className = 'text-white';
      lab.for = inputName;
      lab.innerHTML = label;
      div.appendChild(inp);
      div.appendChild(lab);
      containerDiv.appendChild(div);
};

const createTypeSelectors = (typeDiv, selName, label) => {
      const typeLabel = document.createElement('label');
      typeLabel.for = selName;
      typeLabel.innerHTML = label;
      typeLabel.className = 'form-label text-white fs-6 pe-3 pt-3';
      typeDiv.appendChild(typeLabel);
      const typeSelect = document.createElement('select');
      typeSelect.id = selName;
      typeSelect.className = 'form-control bg-dark border-0 text-white dropdown';
      typeDiv.appendChild(typeSelect);
      for (const body in bodies.data) {
            const opt = document.createElement('option');
            opt.value = body;
            opt.innerHTML = body.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                  return str.toUpperCase();
            });
            typeSelect.appendChild(opt);
      }
};

const createServiceSelectors = (serviceDiv, selName, label) => {
      const typeLabel = document.createElement('label');
      typeLabel.for = selName;
      typeLabel.innerHTML = label;
      typeLabel.className = 'form-label text-white fs-6 pe-3 pt-3';
      serviceDiv.appendChild(typeLabel);
      const typeSelect = document.createElement('select');
      typeSelect.id = selName;
      typeSelect.className = 'form-control bg-dark border-0 text-white dropdown';
      serviceDiv.appendChild(typeSelect);
      for (const s in serves.data) {
            const opt = document.createElement('option');
            opt.value = s;
            opt.innerHTML = s.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
                  return str.toUpperCase();
            });
            typeSelect.appendChild(opt);
      }
};

$(document).ready(() => {
      $.ajax({
            url: 'http://localhost:1111/slots/maxCars',
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            success: function (cars) {
                  $.ajax({
                        url: 'http://localhost:1111/slots/all',
                        method: 'GET',
                        data: {},
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        success: function (response) {
                              createSlots(cars.data, response.data.length);
                              const ops = cardropdown.childNodes;
                              for (let i = 0; i < maxCars; i += 1) {
                                    if (i < Number(cars.data)) ops[i].disabled = false;
                                    else ops[i].disabled = true;
                              }

                              ops[0].selected = true;

                              getPossibleSlots();
                              createFields();
                        },
                        error: function (error) {
                              console.log(error);
                        },
                  });
            },
            error: function (error) {
                  console.log(error);
            },
      });
      $.ajax({
            url: 'http://localhost:1111/cars/',
            method: 'GET',
            data: {},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            success: function (types) {
                  bodies = types;
            },
            error: function (error) {
                  console.log(error);
            },
      });
      $.ajax({
            url: 'http://localhost:1111/services/',
            method: 'GET',
            data: {},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            success: function (serv) {
                  serves = serv;
            },
            error: function (error) {
                  console.log(error);
            },
      });
});

cardropdown.addEventListener('change', () => {
      getPossibleSlots();
      createFields();
});
