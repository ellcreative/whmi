$(".popup--staff-bg").on("click", function () {
  $(this).closest(".popup--staff").siblings(".team-item").click();
});
