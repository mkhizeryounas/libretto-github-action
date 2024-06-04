const axios = require('axios');

const updatePrompt = (accessToken) => {
  let data = JSON.stringify({
    query: `mutation InsertNewTemplateText($templateText: prompt_template_texts_insert_input!) {
  insert_prompt_template_texts_one(
    object: $templateText
    on_conflict: {constraint: prompt_template_texts_prompt_template_id_templates_hash_key, update_columns: [parameter_metadata]}
  ) {
    id
    __typename
  }
}`,
    variables: {
      templateText: {
        prompt_template_id: 'b60e14e4-f1f8-4118-9206-0087714b02e7',
        chat_template: [
          {
            role: 'assistant',
            content: [
              {
                text: "You will have access to a specific member which main data you can retrieve by using 'get_member_data'. Also you can use other tools like `get_member_*` to retrieve info about the QTEs of a member, all the accounting software data, Gusto data, survey data, Tax organizers (BTR/ITR) status and Books data. If the user requires information about a different member, you can tell it to create a new `Thread` for that member.",
                type: 'text',
              },
            ],
          },
          { role: 'user', content: [{ text: '{prompt}', type: 'text' }] },
        ],
        parameter_metadata: { prompt: { description: '' } },
        latest_of_template: {
          on_conflict: {
            constraint: 'prompt_templates_pkey',
            update_columns: ['latest_text_id'],
          },
          data: [
            {
              id: 'b60e14e4-f1f8-4118-9206-0087714b02e7',
              api_name: 'collective-assistant',
              project_id: '655b630a-f8ad-4ab2-81dd-dfbdc1dda5a3',
              readable_name: 'HUB Assistant',
            },
          ],
        },
        tools: [
          {
            type: 'function',
            function: {
              name: 'get_member_data',
              description:
                'You can get almost all the information about a member here:        - Personal information        - Member workflows        - Stripe payment information        - Business information.        You can ask for a member by name',
            },
          },
          {
            type: 'function',
            function: {
              name: 'get_member_qtes',
              description:
                'You can get all the QTEs of a member. Each one of them will have:        - Net income        - Gross wages        - Status        - Is manual        - Quarter of the QTE        - Year of the qte        - Calculated at (The date when the qte was calculated)        - Federal estimation        - State estimations        - Tax id        - Estimated state tax        - Estimated federal tax        - Total estimated        - The previous QTE with:            - Total state            - Total federal            - Total',
            },
          },
          {
            type: 'function',
            function: {
              name: 'get_member_accounting_software_data',
              description:
                'You can get all the accounting software data of a member. All the Hudlr, Xero or QBO details (Profit reports, balance sheets, etc) by giving a specific start and end date',
            },
          },
          {
            type: 'function',
            function: {
              name: 'get_member_gusto_data',
              parameters: {
                type: 'object',
                required: ['start_date', 'end_date'],
                properties: {
                  end_date: {
                    type: 'string',
                    description: 'The end date of the report',
                  },
                  start_date: {
                    type: 'string',
                    description: 'The start date of the report',
                  },
                },
              },
              description:
                'You can get all the Gusto data of a member. This data has something similar to the next structure:        gusto:            - gusto_record:        All the information in gusto about the member            - hub_record:                A copy of the information in our hub about the member            salary_recommendation:                - recommended_low                - recommended_high                - date                - is_valid        With this data, do a match between the fields in gusto_record        and hub_record giving more relevance to the ones in gusto_record.',
            },
          },
          {
            type: 'function',
            function: {
              name: 'get_member_survey_data',
              description:
                'You can get all the CSat and NPS data of a member.            Like the NPS scores (goes from 1 to 10), the CSat score (goes from 1 to 5). Comments in the            responses. How many times has been resent, when it was completed. With this info            you will be able to also get the overall sentiment the member has with us.            This method will look into all the different surveys we have sent to the member.',
            },
          },
          {
            type: 'function',
            function: {
              name: 'get_member_btr_itr_status',
              description:
                'You can get all the Business Tax Return (BTR) or        Individual Tax Return (ITR) information a member has with        us like The stage they where in each organizer, etc.        The tax organizers will have details like:        - Has missing information        - Is organizer locked        - Updated at        - Type (BTR or ITR)        - Year (The year of the tax return)        - Stage name        - Stage status        - Task end by (The estimated date when the task ends)        - Extended (If the task return opted for an extension)        - Is spouse filing jointly the tax return',
            },
          },
          {
            type: 'function',
            function: {
              name: 'get_member_books_data',
              description:
                'You can get all the Books data of a member. All the books data with details like:        - Bookeeping provider (Hurdlr, Plaid, Quickbooks Online, Xero)        - Period        - Period start        - Period end        - Month        - Year        - Status (in progress, completed, incomplete, failed, cancelled)        - Close reason        - Close reason other',
            },
          },
          {
            type: 'function',
            function: {
              name: 'search_member_documents',
              description:
                "You can search for all the documents of a member. You can search        - Financial reports        - General ledgers        - Schedule k1        - Individual tax returns        - Business tax returns        - etc. You can help the user look for the information in the documents and share the source            document for them to refer.        Make sure to check for the date ranges of the context and the question. If the context is outdated,        just say **I can't find the final answer but you may want to check the following links** and add the        source links as a list.        Make sure to return the source links as is.",
              parameters: {
                type: 'object',
                required: ['query'],
                properties: {
                  query: {
                    type: 'string',
                    description: 'The query to search in the documents',
                  },
                },
              },
            },
          },
        ],
        files: null,
      },
    },
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://imaginary-prod.hasura.app/v1/graphql',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios.request(config);
};

module.exports = updatePrompt;
