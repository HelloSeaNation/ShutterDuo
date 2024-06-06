import React from 'react'
import { Box, Flex, Image, Link } from "@chakra-ui/react";

interface SocialMediaProps {
    iconSrc: string;
    iconAlt: string;
    url: string;
}

const SocialMedia: React.FC<SocialMediaProps> = ({ iconSrc, iconAlt, url }) => {

    return (
        url ? (
            <Box as={Link} href={url} isExternal>
                <Image
                    src={iconSrc}
                    alt={iconAlt}
                    boxSize="60px"
                />
            </Box>
        ) : null
    );
}

export default SocialMedia;