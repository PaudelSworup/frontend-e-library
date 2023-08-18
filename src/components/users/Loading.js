import React from "react";
import {ImSpinner2} from "react-icons/im"

const Loading = () => {
  const facts = [
    "Incredible Great Wall: The Great Wall of China spans 13,000 miles, though it isn't visible from space.",
    "Time-Resistant Honey: Edible honey found in ancient Egyptian tombs after 3,000 years highlights its remarkable shelf life.",
    "Historical Complaint: Among the world's oldest customer complaints comes from ancient times, showing that customer dissatisfaction is timeless.",
    "Egyptian Pyramids' Age: The Great Pyramid of Giza is over 4,500 years old, making it one of the oldest and largest structures ever built.",
    "Living Fossil: The coelacanth, a prehistoric fish thought to be extinct, has been discovered alive and swimming in the ocean.",
    "Jellyfish Immortality: Certain jellyfish can revert back to their juvenile state after reaching maturity, potentially making them biologically immortal.",
    "Unsinkable Lake: The dense saltwater of the Dead Sea allows swimmers to effortlessly float on its surface due to its extreme buoyancy.",
    "Endless Lightning: The Catatumbo Lightning in Venezuela can produce non-stop lightning storms for up to 160 nights a year.",
  ];

  function getRandomFact() {
    const randomIndex = Math.floor(Math.random() * facts.length);
    return facts[randomIndex];
  }

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center items-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-12 sm:w-12">
                    <>
                      <ImSpinner2 className="text-3xl animate-spin" />
                    </>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      <span className="animate-pulse">Loading.....</span>
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 tracking-wide">
                        {getRandomFact()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
