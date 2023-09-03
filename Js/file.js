let videos = [];

// sort by view section -------->

const sortViews = () => {
    const sortedData = videos.sort((a, b) => {
        const firstView = parseInt(a.others.views);
        const secondView = parseInt(b.others.views);

        return secondView - firstView;
    });
    cardsDivision(sortedData);
};

// sort by view section -------->


// cards division -------->

const cardsDivision = (videos) => {
    const cardsSection = document.getElementById("cards-section");
    cardsSection.innerHTML = "";
    videos.forEach(news => {
        const div = document.createElement('div');
        const PostedDate = parseInt(news?.others.posted_date);

        let hours = Math.floor(PostedDate / 3600);
        let minutes = Math.floor((PostedDate % 3600) / 60);
        const timeAgo = PostedDate ? `${hours} hrs ${minutes} min ago` : "";

        div.innerHTML = `
              <div class="card bg-base-100 shadow-xl">
      <figure class="px-10 relative pt-10">
        <div>
        <img class="w-[300px] h-[200px] rounded-lg" src="${news?.thumbnail}" class="rounded-xl" />

        <p class="absolute bottom-0 right-0 bg-[#171717] mb-2  rounded-lg w-28 mr-[14%] text-center text-xs text-white">${timeAgo ? timeAgo : ""}</p>
        </div>
      </figure>
      <div class="card-body items-center">
        <div class="flex items-center justify-center text-center gap-5">
          <img class="w-[30px] h-[30px] rounded-full" src="${news?.authors[0]?.profile_picture}" alt="">
          <p class="font-bold text-left">${news?.title}</p>
        </div>
        <div class="text-left mx-auto">
          <div class="mx-auto items-center justify-start flex gap-2">
            <p class="">${news?.authors[0]?.profile_name}</p>
            <p>${news?.authors[0]?.verified ? `<img class="w-[20px] h-[20px]" src="tick.png" alt="">` : ''}</p>
          </div>
          <p class="mx-auto">${news?.others.views} views</p>
        </div>
      </div>
    </div>
              `;
        cardsSection.appendChild(div);
    });
};

// cards division -------->


// tabs buttons section -------->

const categoriesSection = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const dataSec = data.data;

    const tabSection = document.getElementById('tabs-section');

    dataSec?.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="loadNews('${category.category_id}')" class="btn hover:bg-red-600 hover:text-white text-black">${category.category}</button>
        `;

        tabSection.appendChild(div);
    });
};

// tabs buttons section -------->


// load data error section -------->

const loadNews = async (idOfCategory) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${idOfCategory}`
    );
    const data = await res.json();
    videos = data.data;

    const errorContainer = document.getElementById("error-container");
    if (videos?.length === 0) {
        errorContainer.classList.remove("hidden");
    } else {
        errorContainer.classList.add("hidden");
    }
    cardsDivision(data.data);
};

// load data error section -------->


loadNews(1000);
categoriesSection();