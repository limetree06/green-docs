import {
  Breadcrumb,
  ChoiceGroup,
  DatePicker,
  Facepile,
  PersonaSize,
  PrimaryButton,
  ProgressIndicator,
  Text,
  TextField,
} from '@fluentui/react';
import { useEffect, useMemo, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import Sidebar from '../../components/Sidebar/Sidebar';
import useDatePicker from '../../hooks/useDatePicker';
import useInput from '../../hooks/useInput';
import Styled from './Detail.styles';
import { facepilePersonas } from '@fluentui/example-data';
import SubTaskBox from '../../components/SubTaskBox/SubTaskBox';
import { people } from '@fluentui/example-data';
import EmptyScreen from '../../components/EmptyScreen/EmptyScreen';
import { PeoplePicker } from '@microsoft/mgt-react';
import { nanoid } from 'nanoid';

const TestTaskData = [
  {
    id: 1,
    duedate: '2022/11/22',
    title: 'Make viral growth',
    Assignee: people,
    Score: 7,
    isDone: false,
  },
  { id: 2, duedate: '08/07', title: 'Usability test', Assignee: people, Score: 7, isDone: false },
  { id: 3, duedate: '08/12', title: 'User Interview', Assignee: people, Score: 5, isDone: false },
];

const breadcrumbItems = [
  { text: 'Objectives', key: 'objectives-title' },
  { text: 'Successfully launch our new product', key: 'Successfully launch our new product' },
];

const numberOfFaces = 5;

const Detail = () => {
  const [loading] = useState(false);

  const [type, setType] = useState({ key: 'task', text: 'Task' });
  const [name, onChangeName, setName] = useInput('');
  const [dueDate, onSelectDueDate, setDueDate] = useDatePicker('');
  const [description, onChangeDescription, setDescription] = useInput('');
  const [score, onChangeScore, setScore] = useInput('');

  const [EntireTasks, setEntireTasks] = useState(TestTaskData);
  const [peopleList] = useState(people);

  useEffect(() => {
    console.log(people);
  }, []);

  function toggleTask(task, index) {
    setEntireTasks((prevTasks) => {
      const nextTasks = [...prevTasks];
      nextTasks[index] = { ...task, isDone: !task.isDone };
      return nextTasks;
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(type, name, dueDate, description, score);

    if (type.key === 'sub-task') {
      setEntireTasks((prevTasks) => {
        return [
          ...prevTasks,
          {
            id: nanoid(),
            dueDate,
            title: name,
            Assignee: people,
            Score: score,
            isDone: false,
          },
        ];
      });
    }

    setName('');
    setDescription('');
    setDueDate('');
    setScore('');
  };

  const handleChangeType = (event, option) => {
    setType(option);
  };

  const handleInputChange = (event) => {
    console.log(event.target.selectedPeople);
  };

  const isValidForm = name.trim() !== '';
  const personas = useMemo(() => facepilePersonas.slice(0, numberOfFaces), []);

  useEffect(() => {}, []);

  return (
    <Layout>
      <Sidebar>
        <Styled.SidebarContent>
          <Text variant="large">New Task/Sub Task</Text>
          <Styled.Form onSubmit={handleSubmit}>
            <Styled.FormField>
              <ChoiceGroup
                defaultSelectedKey="task"
                options={[
                  { key: 'task', text: 'Task' },
                  { key: 'sub-task', text: 'Sub Task' },
                ]}
                onChange={handleChangeType}
                label="Type"
                required
              />
            </Styled.FormField>
            <Styled.FormField>
              <TextField
                label={`${type.text} name`}
                required
                value={name}
                onChange={onChangeName}
              />
            </Styled.FormField>
            <Styled.FormField>
              <DatePicker
                label="Due Date"
                placeholder="Select a date..."
                ariaLabel="Select a date"
                value={dueDate}
                onSelectDate={onSelectDueDate}
              />
            </Styled.FormField>
            <Styled.FormField>
              <TextField label="Description" value={description} onChange={onChangeDescription} />
            </Styled.FormField>
            <Styled.FormField>
              <TextField label="Score" type="number" value={score} onChange={onChangeScore} />
            </Styled.FormField>
            <Styled.FormField>
              <Text as="label" style={{ display: 'block', fontWeight: '600', padding: '5px 0px' }}>
                Assignee
              </Text>
              <PeoplePicker userType="user" selectionChanged={handleInputChange} />
            </Styled.FormField>
            <Styled.SubmitField>
              <PrimaryButton type="submit" text="Create" disabled={!isValidForm} />
            </Styled.SubmitField>
          </Styled.Form>
        </Styled.SidebarContent>
      </Sidebar>
      {loading ? (
        <EmptyScreen
          title={'Task or Sub Task created in this workspace will appear here'}
          image={'ChartWomen'}
        ></EmptyScreen>
      ) : (
        <Styled.Detail>
          <Breadcrumb items={breadcrumbItems} maxDisplayedItems={3} overflowIndex={1} />
          <Styled.DescriptionWrapper>
            <Text variant="medium">
              One of the key elements to a successful product launch is careful product launch
              planning. From the design phase through sales tracking, you need a road map to help
              you stay on the right path.
            </Text>
          </Styled.DescriptionWrapper>
          <Styled.DueDateWrapper>
            <Text variant={'large'}>Until 2022/09/01</Text>
          </Styled.DueDateWrapper>
          <Styled.FacepileWrapper>
            <Facepile personaSize={PersonaSize.size32} personas={personas} />
          </Styled.FacepileWrapper>
          <Styled.ProgressIndicator>
            <ProgressIndicator percentComplete={0.5} />
          </Styled.ProgressIndicator>

          <Styled.TaskCardListWrapper>
            <Text variant="large">Sub Tasks</Text>
            <Styled.TaskCardList>
              {EntireTasks.map((task, index) => (
                <SubTaskBox key={task.id} task={task} onClick={() => toggleTask(task, index)} />
              ))}
            </Styled.TaskCardList>
          </Styled.TaskCardListWrapper>
        </Styled.Detail>
      )}
    </Layout>
  );
};

export default Detail;
