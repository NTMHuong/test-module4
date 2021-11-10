let urlProvince = `http://localhost:8080/provinces`;

let urlCountry = `http://localhost:8080/countries`;

$(document).ready(function () {
        getAll()
        $("#q").keypress(function (event) {
            if (event.keyCode === 13) {
                $("#search").click();
            }
        });
    }
)

function getAll() {
    $.ajax({
        url: urlProvince,
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (province) {
            if (province.content.length === 0) {
                $("#list").html(
                    ` <tr>
                        <th colspan=6 style="color: red ; text-align: center">Không có dữ liệu</th>
                      </tr>`
                )
            } else {
                let ct = ""
                for (let i = 0; i < province.content.length; i++) {
                    ct += getProvince(province.content[i])
                }
                $("#list").html(ct);
            }
        }
    })
}

function getProvince(province) {
    return ` <tr>
                <th scope="row">${province.id}</th>
                <td>${province.name}</td>
                <td>${province.area}</td>
                <td>${province.population}</td>
                <td>${province.gdp}</td>
                <td>${province.description}</td>
                <td>${province.country?.name}</td>
                <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="showEditProvince(${province.id})" data-bs-target="#modalEdit">
                        Edit
                    </button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDelete" onclick="remove(${province.id})">
                         Delete
                    </button>
                </td>
            </tr>`
}

function searchProvinceByName() {
    let search = $("#q").val();
    $.ajax({
        url: urlProvince + `?q=${search}`,
        type: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: search,
        success: function (province) {
            if (province.content.length === 0) {
                $("#list").html(
                    ` <tr>
                        <th colspan=6 style="color: red ; text-align: center">Không có dữ liệu</th>
                      </tr>`
                )
            } else {
                let ct = ""
                for (let i = 0; i < province.content.length; i++) {
                    ct += getProvince(province.content[i])
                }
                $("#list").html(ct);
            }
        }
    })
}

function showCountry(country) {
    return `<option id="${country.id}" value="${country.id}">${country.name}</option>`
}

function showCountries() {
    $.getJSON(urlCountry, function (country) {
        let content = "";
        for (let i = 0; i < country.content.length; i++) {
            content += showCountry(country.content[i])
        }
        $(".country").html(content)
    })
}

function clear() {
    $('#nameProvinceCreate').val("")
    $('#areaProvinceCreate').val("")
    $('#populationProvinceCreate').val("")
    $('#GDPProvinceCreate').val("")
    $('#descriptionProvinceCreate').val("")
}

function showCreateProvince() {
    showCountries();
}

function create() {
    let name = $('#nameProvinceCreate').val();
    let area = $('#areaProvinceCreate').val();
    let population = $('#populationProvinceCreate').val();
    let gdp = $('#GDPProvinceCreate').val();
    let country = $('#countryProvinceCreate').val();
    let description = $('#descriptionProvinceCreate').val();
    let newProvince= {
        name: name,
        area: area,
        population: population,
        gdp: gdp,
        country: {
            id: country
        },
        description: description
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newProvince),
        url: urlProvince,
        success: function () {
            getAll();
            clear();
        }
    });
    event.preventDefault();
}

function showEditProvince(id) {
    $.ajax({
        url: urlProvince + `/${id}`,
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function (province) {
            $("#id").val(province.id)
            $("#name").val(province.name)
            $("#area").val(province.area)
            $("#population").val(province.population)
            $("#GDP").val(province.gdp)
            $("#description").val(province.description)
            $("#country").val(province.country.id)
            showCountries();
            $("#update").click(function () {
                update(id);
            })
        }
    })
}
function update(id) {
    let name = $('#name').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let country = $('#country').val();
    let description = $('#description').val();
    let newProvince= {
        name: name,
        area: area,
        population: population,
        gdp: gdp,
        country: {
            id: country
        },
        description: description
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newProvince),
        url: urlProvince + `/${id}`,
        success: function () {
            getAll();
        }
    });
    event.preventDefault();
}
function remove(id) {
    $.ajax({
        type: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: urlProvince + `/${id}`,
        success: function () {
            getAll();
            alert("Ấn delete rồi thì xóa đây! OK")
        }
    });
}

