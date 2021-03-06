import React from "react";
import { Box } from "@chakra-ui/layout";
import { Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/table";
import { formatName } from "../utils";
import { Link } from "react-router-dom";
import { ROUTERS } from "../constants/routers";

function List({ titles, blankTitle = 0, content }) {
  const blankHeaderRow = [];
  const titleLen = titles.length;

  for (let i = 0; i < blankTitle; i++) {
    blankHeaderRow.push("");
  }

  return (
    <Box>
      <Table>
        <Thead>
          <Tr mb="20px">
            {titles.map((title) => (
              <Th key={title} fontSize="20px" textTransform="capitalize">
                {formatName(title)}
              </Th>
            ))}
            {blankHeaderRow.map((_, idx) => (
              <Th key={idx}></Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {content.map((item, idx) => (
            <Tr key={idx}>
              {titles.map((title, childId) => (
                <Td key={title} fontSize="17px">
                  {childId === 0 ? (
                    <Link to={`${ROUTERS.CONTEST}/${item[title]}`}>
                      {item[title]}
                    </Link>
                  ) : (
                    item[title]
                  )}
                </Td>
              ))}
              {blankHeaderRow.map((_, idx) => (
                <Td key={idx}>{item[idx + titleLen]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default List;
