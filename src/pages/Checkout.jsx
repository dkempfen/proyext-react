import { useContext } from "react";
import { CartContext } from "../context";
import {
  Box,
  Heading,
  Alert,
  AlertIcon,
  VStack,
  Flex,
  Text,
  HStack,
  IconButton,
  Spacer,
  Divider,
  Button,
  Image,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";

export const Checkout = () => {
  const { cartState, addItem, removeItem, deleteItem } = useContext(CartContext);

  const navigate = useNavigate();

  // Calcular el total del carrito
  const total = cartState.reduce(
    (acc, item) => acc + item.price * item.qtyItem,
    0
  );

  // Navegar a la página de pago
  const handleNavigatePayment = () => {
    navigate("/payment");
  };

  // Renderizar el carrito vacío
  const EmptyCart = () => (
    <Alert status="info" borderRadius="md">
      <AlertIcon />
      Tu carrito está vacío.
    </Alert>
  );

  // Renderizar un elemento del carrito
  const CartItem = ({ item }) => (
    <Flex
      key={item.id}
      p={4}
      borderWidth="1px"
      borderRadius="md"
      alignItems="center"
      boxShadow="sm"
    >
      <Image
        src={item.thumbnail}
        alt={item.title}
        boxSize="100px"
        objectFit="cover"
        borderRadius="md"
        mr={4}
      />
      <Box flex="1">
        <Text fontSize="xl" fontWeight="bold">
          {item.title}
        </Text>
        <HStack spacing={4} mt={2}>
          <Text>Precio: ${item.price.toFixed(2)}</Text>
          <HStack>
            <IconButton
              aria-label="Disminuir cantidad"
              icon={<MinusIcon />}
              size="sm"
              onClick={() => removeItem(item)}
              isDisabled={item.qtyItem === 1}
            />
            <Text>{item.qtyItem}</Text>
            <IconButton
              aria-label="Aumentar cantidad"
              icon={<AddIcon />}
              size="sm"
              onClick={() => addItem(item)}
              isDisabled={item.qtyItem >= item.stock}
            />
          </HStack>
        </HStack>
      </Box>
      <Spacer />
      <HStack>
        <Text fontWeight="bold">
          Subtotal: ${(item.price * item.qtyItem).toFixed(2)}
        </Text>
        <IconButton
          aria-label="Eliminar producto"
          icon={<DeleteIcon />}
          colorScheme="red"
          variant="outline"
          onClick={() => deleteItem(item)}
        />
      </HStack>
    </Flex>
  );

  return (
    <Box p={6} maxW="800px" mx="auto" h="90vh">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Detalle del Carrito
      </Heading>

      {cartState.length === 0 ? (
        <EmptyCart />
      ) : (
        <VStack spacing={4} align="stretch">
          {cartState.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />
          <Flex alignItems="center">
            <Text fontSize="2xl" fontWeight="bold">
              Total: ${total.toFixed(2)}
            </Text>
            <Spacer />
          </Flex>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleNavigatePayment}
            alignSelf="flex-end"
          >
            Comprar
          </Button>
        </VStack>
      )}
    </Box>
  );
};