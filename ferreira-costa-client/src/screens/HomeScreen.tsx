import { Feather } from "@expo/vector-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Center,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Pressable,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { Button, Input, Screen, Select, SelectItem, Text } from "../components";
import { AppBar } from "../components/AppBar";
import { Modal } from "../components/Modal";
import { useListUsers } from "../hooks/useListUsers";
import usePostRequest from "../hooks/usePostRequest";
import usePutRequest from "../hooks/usePutRequest";
import { OrderBy, User, UserStatus } from "../types";
import { AgeGroup } from "../types/AgeGroup";
import { applyCpfMask, formatDate } from "../utils";

interface Filters {
  search: string;
  page: number;
  count: number;
  cpf?: string;
  login?: string;
  status?: UserStatus;
  ageGroup?: number;
  orderBy?: string;
}

const INITIAL_FILTERS: Filters = {
  search: "",
  page: 1,
  count: 6,
  cpf: "",
  login: "",
  status: UserStatus.ACTIVE,
};

export const HomeScreen = () => {
  const [{ users }, { setUsers }] = useListUsers();
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [status, setStatus] = useState<UserStatus>();
  const [login, setLogin] = useState("");
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [total, setTotal] = useState(0);
  const [orderBy, setOrderBy] = useState("");
  const [ageGroup, setAgeGroup] = useState<number>();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const toggleModal = () => setShowModal((prevState) => !prevState);
  const toggleFilterModal = () => setShowFilterModal((prevState) => !prevState);

  const onPressNewUserButton = () =>
    navigation.navigate("AuthNavigator", {
      screen: "AddNewUserScreen",
    });

  const handleOnChangeAgeGroup = (value: string) => {
    const valueAsNumber = Number(value);
    setFilters(INITIAL_FILTERS);
    setUsers([]);
    setAgeGroup(valueAsNumber);
    setFilters((prevState) => {
      return {
        ...prevState,
        search: name,
        cpf,
        login,
        status,
        orderBy,
        ageGroup: valueAsNumber,
      };
    });
  };

  const handleOnChangeCpf = (value: string) => {
    setFilters(INITIAL_FILTERS);
    setUsers([]);
    setCpf(value);
    setFilters((prevState) => {
      return {
        ...prevState,
        search: name,
        cpf: value,
        login,
        status,
        orderBy,
        ageGroup,
      };
    });
  };

  const handleOnChangeStatus = (value: UserStatus) => {
    setFilters(INITIAL_FILTERS);
    setUsers([]);
    setStatus(value);
    setFilters((prevState) => {
      return {
        ...prevState,
        search: name,
        cpf,
        login,
        status: value,
        orderBy,
        ageGroup,
      };
    });
  };

  const handleOnChangeOrderBy = (value: string) => {
    setFilters(INITIAL_FILTERS);
    setUsers([]);
    setOrderBy(value);
    setFilters((prevState) => {
      return {
        ...prevState,
        search: name,
        cpf,
        login,
        orderBy: value,
        status,
        ageGroup,
      };
    });
  };

  const handleOnChangeLogin = (value: string) => {
    setFilters(INITIAL_FILTERS);
    setUsers([]);
    setLogin(value);
    setFilters((prevState) => {
      return {
        ...prevState,
        search: name,
        cpf,
        login: value,
        status,
        orderBy,
        ageGroup,
      };
    });
  };

  const handleOnChangeName = (value: string) => {
    setFilters(INITIAL_FILTERS);
    setUsers([]);
    setName(value);
    setFilters((prevState) => {
      return {
        ...prevState,
        search: value,
        cpf,
        login,
        status,
        orderBy,
        ageGroup,
      };
    });
  };

  const changeFilters = () => {
    if (total > users.length) {
      setFilters((prevState) => {
        return {
          ...prevState,
          page: prevState.page + 1,
        };
      });
    }
  };

  const { mutate: deleteAll } = usePutRequest("/users", {
    onSuccess: () => {
      toggleModal();
      setUsers([]);
      mutate(INITIAL_FILTERS);
    },
  });

  const onPressDeleteAll = () => {
    deleteAll({});
  };

  const { mutate } = usePostRequest<{ total: number; rows: User[] }>("/users", {
    onSuccess: ({ data: { total, rows } }) => {
      setTotal(total);
      setUsers([...users, ...rows]);
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      mutate(filters);
    });

    mutate(filters);

    return unsubscribe;
  }, [filters]);

  const separator = () => <VStack h={0.5} my={3} bg="blueGray.300" />;
  const listEmptyData = () => {
    return (
      <Center>
        <Text>Ainda não há usuários cadastrados.</Text>
      </Center>
    );
  };

  const renderItem = ({ item }: { item: User }) => {
    return (
      <HStack borderRadius={8} bg={"white"} p={4}>
        <VStack w="95%">
          <Text>
            <Text bold>Nome:</Text> {item.name}
          </Text>
          <Text my={0.5}>
            <Text bold>CPF:</Text> {applyCpfMask(item.cpf)}
          </Text>
          <Text>
            <Text bold>Data de nascimento: </Text>
            {formatDate(item.birthday)}
          </Text>
        </VStack>
        <Pressable
          onPress={() =>
            navigation.navigate("DetailsScreen", {
              id: item.id,
            })
          }
        >
          <Feather name="edit" />
        </Pressable>
      </HStack>
    );
  };
  return (
    <Screen>
      <AppBar label="Home" />
      <VStack my={4} flex={1} px={8}>
        <HStack w={"90%"}>
          <Input
            value={name}
            placeholder="Digite o nome que deseja buscar..."
            onChangeText={handleOnChangeName}
          />
          <HStack h="75%">
            <IconButton
              onPress={toggleFilterModal}
              icon={
                <Icon
                  size="md"
                  as={<Feather name="filter" />}
                  color="darkBlue.800"
                />
              }
            />
          </HStack>
        </HStack>
        <FlatList
          keyExtractor={(item, index) => `${item.id}-${index}`}
          flex={1}
          data={users}
          ListEmptyComponent={listEmptyData}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={changeFilters}
          ItemSeparatorComponent={separator}
          ListFooterComponent={<VStack my={2} />}
        />
        <VStack>
          <Button
            mb={2}
            label="Adicionar novo usuário"
            onPress={onPressNewUserButton}
          ></Button>
          <Button
            mb={2}
            bg={"error.600"}
            _pressed={{
              bg: "error.700",
            }}
            label="Deletar todos os usuários"
            onPress={toggleModal}
          ></Button>
        </VStack>
      </VStack>
      <Modal dismiss={toggleModal} title="Atenção!" isOpen={showModal}>
        <VStack>
          <Text fontSize={"md"}>
            Você deseja <Text bold>deletar todos</Text> os usuários?
          </Text>
          <HStack justifyContent={"space-between"} mt={8}>
            <Button
              w={"45%"}
              bg={"error.600"}
              _pressed={{ bg: "error.700" }}
              label="Sim"
              borderRadius={8}
              onPress={onPressDeleteAll}
            />
            <Button
              w={"45%"}
              label="Não"
              borderRadius={8}
              onPress={toggleModal}
            />
          </HStack>
        </VStack>
      </Modal>

      <Modal
        dismiss={toggleFilterModal}
        title="Filtros"
        isOpen={showFilterModal}
      >
        <VStack>
          <Input
            value={cpf}
            placeholder="Digite o cpf que deseja buscar..."
            onChangeText={handleOnChangeCpf}
          />
          <Input
            value={login}
            placeholder="Digite o login que deseja buscar..."
            onChangeText={handleOnChangeLogin}
          />
          <Select
            defaultValue={status}
            onValueChange={handleOnChangeStatus}
            placeholder="Escolha um..."
          >
            <SelectItem label="Ativo(a)" value={UserStatus.ACTIVE} />
            <SelectItem label="Inativo(a)" value={UserStatus.INACTIVE} />
            <SelectItem label="Bloqueado(a)" value={UserStatus.BLOCKED} />
          </Select>
          <Select
            defaultValue={orderBy}
            onValueChange={handleOnChangeOrderBy}
            placeholder="Escolha um..."
          >
            <SelectItem label="Data de nascimento" value={OrderBy.BIRTHDAY} />
            <SelectItem
              label="Data de criação do usuário"
              value={OrderBy.CREATED_AT}
            />
            <SelectItem
              label="Última atualização do usuário"
              value={OrderBy.UPDATED_AT}
            />
          </Select>
          <Select
            defaultValue={String(ageGroup)}
            onValueChange={handleOnChangeAgeGroup}
            placeholder="Escolha um..."
          >
            <SelectItem
              label="Maior que 18 e menor que 26"
              value={String(AgeGroup.YOUNG_ADULTS)}
            />
            <SelectItem
              label="Maior que 25 e menor que 31"
              value={String(AgeGroup.EARLY_ADULTS)}
            />
            <SelectItem
              label="Maior que 30 e menor que 36"
              value={String(AgeGroup.MID_ADULTS)}
            />
            <SelectItem
              label="Maior que 35 e menor que 41"
              value={String(AgeGroup.LATE_ADULTS)}
            />
            <SelectItem
              label="Maior que 40"
              value={String(AgeGroup.EXPERIENCED)}
            />
          </Select>
        </VStack>
      </Modal>
    </Screen>
  );
};
