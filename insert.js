import PocketBase from "pocketbase";

const BASE_URL = "http://127.0.0.1:8090";
const pb = new PocketBase(BASE_URL);

async function insertData() {
  const data = [
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "067s2rmwb36kqfd",
      is_compatible: true,
    },
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "psy39fpbiltdb0g",
      is_compatible: false,
    },
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "9m8fy943s7ok0fw",
      is_compatible: false,
    },
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "ahn6ifqgtc8nvvu",
      is_compatible: false,
    },
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "nqsaw2ax3gbwham",
      is_compatible: false,
    },
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "bprygmqcuhh59ew",
      is_compatible: false,
    },
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "u1jizcts7z4qqf8",
      is_compatible: false,
    },
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "psy39fpbiltdb0g",
      is_compatible: false,
    },
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "nqsaw2ax3gbwham",
      is_compatible: false,
    },
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "qjx10i8ahx9ih2v",
      is_compatible: false,
    },
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "19x7bqwa79vgjsn",
      is_compatible: false,
    },
    {
      component_id_1: "1thv2b3mwkxwidv",
      component_id_2: "jgl7bsgu4upfqma",
      is_compatible: false,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "067s2rmwb36kqfd",
      is_compatible: true,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "psy39fpbiltdb0g",
      is_compatible: true,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "9m8fy943s7ok0fw",
      is_compatible: false,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "ahn6ifqgtc8nvvu",
      is_compatible: false,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "nqsaw2ax3gbwham",
      is_compatible: false,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "bprygmqcuhh59ew",
      is_compatible: false,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "u1jizcts7z4qqf8",
      is_compatible: false,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "psy39fpbiltdb0g",
      is_compatible: true,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "nqsaw2ax3gbwham",
      is_compatible: false,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "qjx10i8ahx9ih2v",
      is_compatible: false,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "19x7bqwa79vgjsn",
      is_compatible: false,
    },
    {
      component_id_1: "vozfoa3mer93an2",
      component_id_2: "jgl7bsgu4upfqma",
      is_compatible: false,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "067s2rmwb36kqfd",
      is_compatible: true,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "psy39fpbiltdb0g",
      is_compatible: false,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "9m8fy943s7ok0fw",
      is_compatible: true,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "ahn6ifqgtc8nvvu",
      is_compatible: true,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "nqsaw2ax3gbwham",
      is_compatible: false,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "bprygmqcuhh59ew",
      is_compatible: false,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "u1jizcts7z4qqf8",
      is_compatible: false,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "psy39fpbiltdb0g",
      is_compatible: false,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "nqsaw2ax3gbwham",
      is_compatible: true,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "qjx10i8ahx9ih2v",
      is_compatible: false,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "19x7bqwa79vgjsn",
      is_compatible: false,
    },
    {
      component_id_1: "zdndfkea82ptf67",
      component_id_2: "jgl7bsgu4upfqma",
      is_compatible: false,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "067s2rmwb36kqfd",
      is_compatible: false,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "psy39fpbiltdb0g",
      is_compatible: false,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "9m8fy943s7ok0fw",
      is_compatible: false,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "ahn6ifqgtc8nvvu",
      is_compatible: false,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "nqsaw2ax3gbwham",
      is_compatible: true,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "bprygmqcuhh59ew",
      is_compatible: false,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "u1jizcts7z4qqf8",
      is_compatible: false,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "psy39fpbiltdb0g",
      is_compatible: false,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "nqsaw2ax3gbwham",
      is_compatible: true,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "qjx10i8ahx9ih2v",
      is_compatible: false,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "19x7bqwa79vgjsn",
      is_compatible: false,
    },
    {
      component_id_1: "920oq8f4ukqrr7u",
      component_id_2: "jgl7bsgu4upfqma",
      is_compatible: false,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "067s2rmwb36kqfd",
      is_compatible: false,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "psy39fpbiltdb0g",
      is_compatible: false,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "9m8fy943s7ok0fw",
      is_compatible: false,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "ahn6ifqgtc8nvvu",
      is_compatible: false,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "nqsaw2ax3gbwham",
      is_compatible: false,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "bprygmqcuhh59ew",
      is_compatible: true,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "u1jizcts7z4qqf8",
      is_compatible: false,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "psy39fpbiltdb0g",
      is_compatible: false,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "nqsaw2ax3gbwham",
      is_compatible: true,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "qjx10i8ahx9ih2v",
      is_compatible: false,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "19x7bqwa79vgjsn",
      is_compatible: false,
    },
    {
      component_id_1: "q7cgecynz26z8i1",
      component_id_2: "jgl7bsgu4upfqma",
      is_compatible: false,
    },
  ];

  try {
    // Iterate over the data and insert each entry
    for (const entry of data) {
      await pb.collection("compatibility").create(entry);
    }
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

insertData();
