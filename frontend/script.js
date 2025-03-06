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
  const modified = `Suggest me a few youtube videos on the topic ${query} but send me the reply in json format only without any extra responses as an array of objects where each object has a key called title having the value of the title of the video and another key called url with its value as the url to the youtube video and the last key called summary with its value summarizing the video in about 50-100 words.`;
  text_input.value = "";
  fetch(url, {
    headers: {
      query: modified,
      "Content-type": "text/html",
    },
  })
    .then((resp) => resp.text())
    .then((text) => console.log(text)); // The text here is the json output!
});
