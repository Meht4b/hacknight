/*
      <div class="video_holder_container">
        <div class="video_holder">
          <h2>Rust is Killing C++</h2>
          <div class="youtube_video_embed">
            <iframe
              src="https://www.youtube.com/embed/ZQyrrMqLT2s?si=uy4oZv10t3Zptgjw"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
 */

const url = "http://localhost:8080/ask/";

const text_input = document.getElementById("text_input");
const add_button = document.getElementById("text_button");

add_button.addEventListener("click", async () => {
  const query = text_input.value;
  const modified = `Suggest me a few youtube videos on the topic ${query} but send me the reply in json format but in plain text without any prefixes only without any extra responses as an array of objects where each object has a key called title having the value of the title of the video and another key called url with its value as the embedded url to the youtube video and the last key called summary with its value summarizing the video in about 50-100 words.`;
  text_input.value = "";
  fetch(url, {
    headers: {
      query: modified,
      "Content-type": "text/html",
    },
  })
    .then((resp) => resp.text())
    .then((text) => {
      console.log(text)

    }); // The text here is the json output!

});

function createVideo(embed_link,title,summary){
  const video_holder = document.createElement('div');
  video_holder.classList.add("video_holder");

  const video_embed_holder = document.createElement('div');
  video_embed_holder.classList.add("youtube_video_embed");

  const video_embed_iframe = document.createElement('iframe');
  video_embed_iframe.src=embed_link;
  video_embed_iframe.title = "YouTube video player";
  video_embed_iframe.frameborder="0";
  video_embed_holder.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  video_embed_holder.referrerpolicy="strict-origin-when-cross-origin";
  video_embed_holder.allowfullscreen="true";

  video_embed_holder.appendChild(video_embed_iframe);

  video_holder.appendChild(video_embed_holder);


  const video_details = document.createElement('div');
  video_details.classList.add("youtube_video_details");

  const video_details_title = document.createElement('h2');
  video_details_title.innerHTML = title;

  const video_details_summary = document.createElement('p');
  video_details_summary.innerHTML = summary;

  video_details.appendChild(video_details_title);
  video_details.appendChild(video_details_summary);
  video_holder.appendChild(video_details);

  document.getElementById("video_holder_container").appendChild(video_holder)

}



const dummy = [
  {
    "title": "What is Artificial Intelligence? | Introduction to AI | Artificial Intelligence Tutorial | Edureka",
    "url": "https://www.youtube.com/embed/WDXmOIE3MvU?si=wH1S5jstzryp5SKl",
    "summary": "This video provides a comprehensive introduction to Artificial Intelligence. It covers the fundamental concepts, different types of AI, and various applications across industries. The video explains the differences between narrow or weak AI, general or strong AI, and artificial superintelligence. It explores real-world examples, the history of AI and delves into the crucial role of machine learning and deep learning in modern AI development."
  },
  {
    "title": "AI Will Replace Developers - Truth or Fear?",
    "url": "https://www.youtube.com/embed/lJzFH24iM1k",
    "summary": "This video discusses the potential impact of AI on software developers. It explores the capabilities of AI tools like GitHub Copilot and other code generation technologies and whether they will replace human developers. The video also analyzes the current limitations of AI in software development, emphasizing the need for human oversight, creativity, and problem-solving skills. It suggests focusing on learning how to utilize AI tools effectively rather than fearing obsolescence."
  },
    {
    "title": "Artificial Intelligence Full Course | Artificial Intelligence Tutorial for Beginners | Edureka",
    "url": "https://www.youtube.com/embed/cNM_YDktF1U",
    "summary": "This video is a full course on Artificial Intelligence for beginners. It covers core concepts of AI, including machine learning, deep learning, neural networks, and natural language processing (NLP). The tutorial includes hands-on demonstrations and real-world applications to illustrate key principles. The course also touches on the ethical considerations and future trends of AI. It serves as a thorough introduction to the field for those without prior experience."
  }
]





dummy.forEach(element => {
  createVideo(element.url,element.title,element.summary);
});