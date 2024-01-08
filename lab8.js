const data = {
    housework: [
        {
            name: "quét nhà",
            WhenToDo: "8am - 9am",
            importantLever: "low",
            isWork: true,
        },
        {
            name: "lau nhà",
            WhenToDo: "9am - 10am",
            importantLever: "medium",
            isWork: true,
        },
        {
            name: "nấu cơm",
            WhenToDo: "10am - 11am",
            importantLever: "high",
            isWork: false,
        },
    ],
    homework: [
        {
            name: "làm bài tập",
            WhenToDo: "8am - 9am",
            importantLever: "medium",
            isWork: true,
        },
        {
            name: "đọc sách",
            WhenToDo: "9am - 10am",
            importantLever: "low",
            isWork: false,
        },
        {
            name: "làm project",
            WhenToDo: "10am - 11am",
            importantLever: "high",
            isWork: true,
        },
    ],
    relax: [
        {
            name: "xem phim",
            WhenToDo: "8am - 9am",
            importantLever: "low",
            isWork: false,
        },
        {
            name: "nghe nhạc",
            WhenToDo: "9am - 10am",
            importantLever: "medium",
            isWork: false,
        },
        {
            name: "đi chơi",
            WhenToDo: "10am - 11am",
            importantLever: "high",
            isWork: false,
        },
    ],
};

const dataWord = document.getElementById("data_word");

const init = () => {
    for (let key in data) {
        data[key].forEach((item) => {
            dataWord.innerHTML += `<tr class="item">
				<td>
					<input type="checkbox" ${item.isWork ? "checked" : ""}/>
					${item.name}
				</td>
				<td>${item.WhenToDo}</td>
				<td>${item.importantLever}</td>
			</tr>`;
        });
    }
};
init();
const search = document.getElementById("search");
search.addEventListener("keydown", async (e) => {
    const value = e.target.value;
    const dataFilter = {};
    let isLoad = true;
    setTimeout(() => {
        for (let key in data) {
            dataFilter[key] = data[key].filter((item) => {
                return item.name.toLowerCase().includes(value.toLowerCase());
            });
        }
        dataWord.innerHTML = "";
        for (let key in dataFilter) {
            dataFilter[key].forEach((item) => {
                dataWord.innerHTML += `<tr class="item">
				<td>
					<input type="checkbox" ${item.isWork ? "checked" : ""}/>
					${item.name}
				</td>
				<td>${item.WhenToDo}</td>
				<td>${item.importantLever}</td>
			</tr>`;
            });
        }
        isLoad = false;
    }, 1000);
    if (isLoad) {
        dataWord.innerHTML = `<tr class="item col-12";style="position: relative;" >
			<div class="background">
				<div class="spinner"> </div> 
				loading....
			</div>	
		</tr>`;
    }
});
