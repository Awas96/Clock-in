<?php

namespace App\Repository;

use App\Entity\Fichaje;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Fichaje|null find($id, $lockMode = null, $lockVersion = null)
 * @method Fichaje|null findOneBy(array $criteria, array $orderBy = null)
 * @method Fichaje[]    findAll()
 * @method Fichaje[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FichajeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Fichaje::class);
    }

    // /**
    //  * @return Fichaje[] Returns an array of Fichaje objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */


    public function findByEvento($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.evento = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }

}
