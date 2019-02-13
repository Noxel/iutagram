<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ApiResource(
 *     collectionOperations={
 *          "get"={"normalization_context"={"groups"={"get_users"}}},
 *          "post"={"denormalization_context"={"groups"={"post_user"}}}
 *     },
 *     itemOperations={
 *           "get"={"normalization_context"={"groups"={"get_user"}}},
 *           "delete"
 *     },
 *
 *
 * )
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"get_user", "get_users", "get_image"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"get_user", "get_users", "post_user", "get_image"})
     */
    private $username;

    /**
     * @ORM\Column(type="json")
     * @Groups({"get_user"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @var string The hashed password
     * @Groups({"post_user"})
     */
    private $plainPassword;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ImageLike", mappedBy="owner", orphanRemoval=true)
     */
    private $imageLikes;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Image", mappedBy="owner", orphanRemoval=true)
     * @Groups({"get_user"})
     */
    private $images;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="owner", orphanRemoval=true)
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Followers", mappedBy="followed", orphanRemoval=true)
     */
    private $followers;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Followers", mappedBy="user", orphanRemoval=true)
     */
    private $follow;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"get_user"})
     */
    private $avatar;

    /**
     * @Groups({"get_user"})
     */
    public function getPost(){
        return count($this->images);
    }

    /**
     * @Groups({"get_user"})
     */
    public function getNbFollower(){
        return count($this->followers);
    }
    /**
     * @Groups({"get_user"})
     */
    public function getNbUserFollowed(){
        return count($this->follow);
    }


    public function __construct()
    {
        $this->imageLikes = new ArrayCollection();
        $this->images = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->followers = new ArrayCollection();
        $this->follow = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPlainPassword(): string
    {
        return (string) $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|ImageLike[]
     */
    public function getImageLikes(): Collection
    {
        return $this->imageLikes;
    }

    public function addImageLike(ImageLike $imageLike): self
    {
        if (!$this->imageLikes->contains($imageLike)) {
            $this->imageLikes[] = $imageLike;
            $imageLike->setOwner($this);
        }

        return $this;
    }

    public function removeImageLike(ImageLike $imageLike): self
    {
        if ($this->imageLikes->contains($imageLike)) {
            $this->imageLikes->removeElement($imageLike);
            // set the owning side to null (unless already changed)
            if ($imageLike->getOwner() === $this) {
                $imageLike->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Image[]
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setOwner($this);
        }

        return $this;
    }

    public function removeImage(Image $image): self
    {
        if ($this->images->contains($image)) {
            $this->images->removeElement($image);
            // set the owning side to null (unless already changed)
            if ($image->getOwner() === $this) {
                $image->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setOwner($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getOwner() === $this) {
                $comment->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Followers[]
     */
    public function getFollowers(): Collection
    {
        return $this->followers;
    }

    public function addFollower(Followers $follower): self
    {
        if (!$this->followers->contains($follower)) {
            $this->followers[] = $follower;
            $follower->setFollowed($this);
        }

        return $this;
    }

    public function removeFollower(Followers $follower): self
    {
        if ($this->followers->contains($follower)) {
            $this->followers->removeElement($follower);
            // set the owning side to null (unless already changed)
            if ($follower->getFollowed() === $this) {
                $follower->setFollowed(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Follow[]
     */
    public function getFollow(): Collection
    {
        return $this->follow;
    }

    public function addFollow(Followers $follow): self
    {
        if (!$this->follow->contains($follow)) {
            $this->follow[] = $follow;
            $follow->setUser($this);
        }

        return $this;
    }

    public function removeFollow(Followers $follow): self
    {
        if ($this->follow->contains($follow)) {
            $this->follow->removeElement($follow);
            // set the owning side to null (unless already changed)
            if ($follow->getUser() === $this) {
                $follow->setUser(null);
            }
        }

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }
}
