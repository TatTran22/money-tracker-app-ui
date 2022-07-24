import {
  Flex,
  Icon,
  Button,
  VisuallyHidden,
  useDisclosure,
  Avatar as ChakraAvatar,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Stack,
  chakra,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'
import { createRef, useState, useCallback } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'

const Avatar = ({
  user,
  tempAvatarUrl,
  onAvatarChange,
}: {
  user: User
  tempAvatarUrl: string
  onAvatarChange: (avatar: string) => void
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [avatar, setAvatar] = useState<File | string>('')
  const [imageScale, setImageScale] = useState<number>(1)
  const avatarEditorRef = createRef<AvatarEditor>()
  const imageSize = 480

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatar(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const onSave = useCallback(() => {
    if (avatarEditorRef.current) {
      const canvas = avatarEditorRef.current.getImage()
      const dataUrl = canvas.toDataURL()
      onAvatarChange(dataUrl)
    }

    onClose()
  }, [avatarEditorRef, onAvatarChange])

  return (
    <Flex alignItems="center" mt={1}>
      <ChakraAvatar size="xl" name={`${user.first_name} ${user.last_name}`} src={tempAvatarUrl} />

      <Button mx={4} size="sm" onClick={onOpen}>
        Change
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Profile picture</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text size="sm" fontWeight="small" color="gray.700">
              A picture helps people recognize you and lets you know when you’re signed in to your account
            </Text>
            <Dropzone multiple={false} onDrop={onDrop} noClick={!!avatar}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <Flex
                    mt={1}
                    justify="center"
                    align="center"
                    borderWidth={2}
                    _dark={{
                      color: 'gray.500',
                    }}
                    borderStyle="dashed"
                    rounded="md"
                    cursor="pointer"
                  >
                    {!avatar ? (
                      <Stack spacing={1} textAlign="center" justify="center" width={imageSize} height={imageSize}>
                        <Icon
                          mx="auto"
                          boxSize={12}
                          color="gray.400"
                          _dark={{
                            color: 'gray.500',
                          }}
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </Icon>
                        <Flex
                          fontSize="md"
                          color="gray.600"
                          _dark={{
                            color: 'gray.400',
                          }}
                          justifyContent="center"
                          // alignItems="center"
                        >
                          <chakra.label
                            htmlFor="file-upload"
                            cursor="pointer"
                            rounded="md"
                            fontSize="md"
                            color="brand.600"
                            _dark={{
                              color: 'brand.200',
                            }}
                            pos="relative"
                            _hover={{
                              color: 'brand.400',
                              _dark: {
                                color: 'brand.300',
                              },
                            }}
                          >
                            <Text>Upload a file or drag and drop</Text>
                            <VisuallyHidden>
                              <input id="file-upload" name="file-upload" type="file" aria-label="file-upload" />
                            </VisuallyHidden>
                          </chakra.label>
                        </Flex>
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          _dark={{
                            color: 'gray.50',
                          }}
                        >
                          PNG, JPG, GIF up to 10MB
                        </Text>
                      </Stack>
                    ) : (
                      <AvatarEditor
                        width={imageSize}
                        height={imageSize}
                        image={avatar}
                        // border={50}
                        ref={avatarEditorRef}
                        borderRadius={imageSize}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={imageScale}
                        rotate={0}
                      />
                    )}
                  </Flex>

                  <input {...getInputProps()} />
                </div>
              )}
            </Dropzone>
            {avatar && (
              <Slider
                mt={5}
                aria-label="slider-ex-1"
                min={0.5}
                max={2}
                step={0.01}
                defaultValue={1}
                value={imageScale}
                onChange={(value) => {
                  setImageScale(value)
                }}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            )}
          </ModalBody>

          <ModalFooter>
            <Button size="md" variant="secondary" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button size="md" variant="primary" onClick={onSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Avatar
